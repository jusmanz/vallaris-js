interface InitialProps {
    apiKey: string;
    host?: string;
}
declare var config: InitialProps;
declare const initial: ({ host, apiKey }: InitialProps) => void;
export { initial, config };
