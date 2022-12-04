
import { Unity, useUnityContext } from 'react-unity-webgl';
import React, { useEffect, useState } from 'react';
import { DatabaseService } from '../../adaptors/firebase_adaptor';
import { finishGame, getSigner, getTESTBalance, startGame } from '../../adaptors/ethers_adaptor';


function Playground() {

    const {
        unityProvider,
        isLoaded,
        unload,
        loadingProgression,
        addEventListener,
        removeEventListener,
        requestFullscreen,
        takeScreenshot,
        sendMessage,
    } = useUnityContext({
        loaderUrl: "build/Build.loader.js",
        dataUrl: "build/Build.data",
        frameworkUrl: "build/Build.framework.js",
        codeUrl: "build/Build.wasm",
        productName: "Crpyto Ninja",
        companyName: "CodeDecoders",
    });


    const [history, setHistory] = useState(false);

    const [user, setUser] = useState('');

    const handleConnectWallet = async () => {
        const signer = await getSigner();
        const address = await signer.getAddress();
        setUser(address);
        const balance = await getTESTBalance();
        sendMessage("Main Camera", "setAddress", address);
        sendMessage("Main Camera", "setToken", "TEST");
        sendMessage("Main Camera", "setCoins", (balance / 10 ** 18).toFixed(2));
    }

    const handleJoinRoom = async () => {
        const signer = await getSigner();
        const address = await signer.getAddress();
        console.log("Joining Room");
        const state = await DatabaseService.get()
        await startGame();
        await DatabaseService.update({
            data: state.user1Address === "" ? {
                "user1Address": address,
            } : {
                "user2Address": address,

            }
        })
        DatabaseService.subscribe((data) => {

            sendMessage("Main Camera", "UpdateRoom", JSON.stringify(data));
        });
    }

    const handleStartGame = async () => {
        console.log("Starting Game");
        DatabaseService.subscribe((data) => {

            sendMessage("Game Manager", "UpdateData", JSON.stringify(data));
        });
    }

    const handleUpdateMatch = async (val) => {
        console.log("Updating Match", val);
        const state = await DatabaseService.update({
            data: val,
        })
    }

    const handleEndMatch = async (val) => {
        if (!history) {
            setHistory(true);
            console.log("Ending Match", val);
            await finishGame();
            // await for 5 seconds
            // setTimeout(async () => {
            sendMessage("Game Manager", "HandleCompleteButton");
            // }, 5000);

        }
    }

    const handleWithdraw = async () => {
        console.log("Withdrawing");
        const state = await DatabaseService.get();
        console.log(state)
        await DatabaseService.history(state);
        await DatabaseService.reset()
        // const state = await DatabaseService.reset()
    }

    const handleCancelRoom = async () => {
        await DatabaseService.reset()
        console.log('Cancel Room');
    }

    useEffect(() => {
        addEventListener("OnConnectWallet", handleConnectWallet);
        addEventListener("JoinRoom", handleJoinRoom)
        addEventListener("UpdateMatch", handleUpdateMatch)
        addEventListener("EndMatch", handleEndMatch)
        addEventListener("Withdraw", handleWithdraw)
        addEventListener("CancelRoom", handleCancelRoom)
        addEventListener("StartGame", handleStartGame)
        return () => {
            unload()
            removeEventListener("OnConnectWallet", handleConnectWallet);
            removeEventListener("JoinRoom", handleJoinRoom)
            removeEventListener("UpdateMatch", handleUpdateMatch)
            removeEventListener("EndMatch", handleEndMatch)
            removeEventListener("Withdraw", handleWithdraw)
            removeEventListener("CancelRoom", handleCancelRoom)
            removeEventListener("StartGame", handleStartGame)
        }

    }, [addEventListener, removeEventListener, unload])

    const loadingPercentage = Math.round(loadingProgression * 100);
    return (
        <div>
            {isLoaded === false && (
                // We'll conditionally render the loading overlay if the Unity
                // Application is not loaded.
                <div className="loading-overlay">
                    <p>Loading... ({loadingPercentage}%)</p>
                </div>
            )}
            {(
                <Unity
                    className="unity"
                    unityProvider={unityProvider}
                    style={{
                        width: "100vw",
                        height: "100vh",
                        overflow: "hidden",
                    }}
                />
            )}
        </div>
    );
}

export default Playground;
