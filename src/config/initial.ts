
import { features } from '../features'
import { styles } from '../styles';
import { getFetch, parseURL } from './fetch';

const defaultHOST = "https://cloud.vallarismaps.com";

interface InitialProps {
    apiKey: string;
    host?: string;
}

var config: InitialProps;

class Initial {
    features = features
    styles = styles
    constructor(source: InitialProps) {
        config.host = source.host ? source.host : defaultHOST;
        if (source.apiKey) {

            config.apiKey = source.apiKey;

            const profile = getFetch(parseURL('profile', 'GET'), { method: 'GET' });

            profile.then(rs => {
                if (rs.response === 200) {
                    this.features = features
                    this.styles = styles
                } else {
                    this.features = null;
                    this.styles = null
                }
            })
        } else {
            this.features = null
        }
    }
}

export { config }

export default Initial
