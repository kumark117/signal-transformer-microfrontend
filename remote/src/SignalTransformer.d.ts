interface SignalTransformerProps {
    multiplier: number;
    onResult: (value: number) => void;
    onClear: () => void;
}
export default function SignalTransformer({ multiplier, onResult, onClear }: SignalTransformerProps): import("react/jsx-runtime").JSX.Element;
export {};
