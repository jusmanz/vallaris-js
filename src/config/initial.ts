
import { features } from '../features'
import { FeaturesClient } from '../features'
import { getFetch, parseURL } from './fetch';
const defaultHOST = "https://app.vallarismaps.com";

interface InitialProps {
    apiKey: string;
    host?: string;
}

var config: InitialProps = {
    apiKey: "",
    host: "",
};

class createClient {
    features = features
    Features = FeaturesClient
    constructor(source: InitialProps) {
        config.host = source.host ? source.host : defaultHOST;
        if (source.apiKey) {

            config.apiKey = source.apiKey;

            const profile = getFetch(parseURL('profile', 'GET'), { method: 'GET' });

            profile.then(rs => {
                if (rs.status === 200) {
                    this.features = features
                    this.Features = FeaturesClient

                } else {
                    this.features = null;
                    this.Features = null

                }
            })
        } else {
            this.features = null
            this.Features = null

        }
    }
}


export { config }

export default createClient
