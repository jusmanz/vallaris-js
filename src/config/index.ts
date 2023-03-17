const defaultHOST = "https://cloud.vallarismaps.com";

interface InitialProps {
  apiKey: string;
  host?: string;
}

var config: InitialProps;

const initial = ({ host, apiKey }: InitialProps) => {
  config.host = host ? host : defaultHOST;

  if (config.apiKey) {
    config.apiKey = apiKey;
  } else {
    throw new Error("API Key is require please check in management > API Key");
  }

  if (config.apiKey) {
    config.apiKey = apiKey;
  } else {
    throw new Error("API Key is require please check in management > API Key");
  }
};

export { initial, config };
