export default function LoadingAnimation({
    bg = "rgb(var(--color-neutral-50))",
}: {
    bg?: string;
}) {
    return (
        <>
            <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
            </div>
            <style jsx>{`
                .lds-ellipsis {
                    display: inline-block;
                    position: relative;
                    width: 20px;
                    height: 20px;
                }
                .lds-ellipsis div {
                    position: absolute;
                    top: 8.25px;
                    width: 3.25px;
                    height: 3.25px;
                    border-radius: 50%;
                    background: ${bg};
                    animation-timing-function: cubic-bezier(0, 1, 1, 0);
                }
                .lds-ellipsis div:nth-child(1) {
                    left: 2px;
                    animation: lds-ellipsis1 0.6s infinite;
                }
                .lds-ellipsis div:nth-child(2) {
                    left: 2px;
                    animation: lds-ellipsis2 0.6s infinite;
                }
                .lds-ellipsis div:nth-child(3) {
                    left: 8px;
                    animation: lds-ellipsis2 0.6s infinite;
                }
                .lds-ellipsis div:nth-child(4) {
                    left: 14px;
                    animation: lds-ellipsis3 0.6s infinite;
                }
                @keyframes lds-ellipsis1 {
                    0% {
                        transform: scale(0);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                @keyframes lds-ellipsis3 {
                    0% {
                        transform: scale(1);
                    }
                    100% {
                        transform: scale(0);
                    }
                }
                @keyframes lds-ellipsis2 {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(6px, 0);
                    }
                }
            `}</style>
        </>
    );
}
