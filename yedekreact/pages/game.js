import React,{ Fragment } from 'react';
import { useEffect, useRef, useState } from 'react';
import {Unity, useUnityContext}  from "react-unity-webgl";
import Head from 'next/head'

import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useConnect, metamaskWallet } from "@thirdweb-dev/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { useConnectionStatus } from "@thirdweb-dev/react";






export default function Home() {
 
  const [provider, setProvider] = useState(null);
  let connectionStatus = useConnectionStatus();
  const address = useAddress();
  
  
  
  const {unityProvider, sendMessage} = new useUnityContext({
    loaderUrl: "./Megaman/Build/ApiChickyLastTestUnity.loader.js",
    dataUrl: "./Megaman/Build/ApiChickyLastTestUnity.data",
    frameworkUrl: "./Megaman/Build/ApiChickyLastTestUnity.framework.js",
    codeUrl: "./Megaman/Build/ApiChickyLastTestUnity.wasm",
    
  });
  function handleClickSpawnEnemies() {
    
    console.log(address);
    sendMessage("LeaderBoard", "SettingWalletAddress", address);
  }
  function handleClick() {
    
    window.location.reload();
  }
  
const handleButtonClick = () => {
  handleClick();
    
  };
  const [addressExists, setaddressExists] = useState(false);

  
  const buttonStyle = {
    backgroundColor: '#ad0000',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };
  const buttonStyleMint = {
    backgroundColor: 'gray',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const buttons = [
    { name: 'About', href: '/about' },
    { name: 'Mint', href: '/mint' },
    { name: 'Game', href: '/game' },
  ];
  
  
  
  

  return (
    <ThirdwebProvider activeChain="arbitrum-goerli" supportedWallets={[metamaskWallet()]}>
    <div className="about-background"> 
<Flex className="BagelFatOne" justify="space-between" align="center" padding="30px">

        
            {/*Left Side - Social Media Icons*/}
            
                
                <Link href="/">
                    <Image src="/images/LOGO.png" width="175px" margin="0 100px"/>
                </Link>
                
            
            
           

            
            {/*Right Side - Sections and Connect*/}
            <Flex justify="space-between" align="center" padding="30px">
      {buttons.map((button, index) => (
        <a
          key={index}
          href={button.href}
          style={{
            margin: '0 8px',
            padding: '10px 30px',
            backgroundColor: hoveredIndex === index ? '#b1b8f2' : '#929bed',
            color: hoveredIndex === index ? 'black' : 'white',
            cursor: 'pointer',
            textDecoration: 'none',
            borderRadius: '10%',
            fontSize: '20px',
            lineHeight: '0.75',
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {button.name}
        </a>
      ))}
      
      <ConnectWallet />
    </Flex>
  
</Flex>
<div className="BagelFatOne">
      {address ? (
        <div>
          {address}
        <Unity unityProvider={unityProvider} style={{ justifySelf: "center", width: 1920 ,alignSelf:"center"}}
         disabledCanvasEvents={["dragstart", "scroll"]}
        />

        {handleClickSpawnEnemies()}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '0 20px' }} >Please Connect your wallet.
        <div style={{ textAlign: 'center', padding: '0 20px' }} >AND</div>
        <div style={{ textAlign: 'center', padding: '0 20px' }} >Press Play!</div>
        
        <div style={{ textAlign: 'center', padding: '0 20px',boxSizing:'100px' }}>
      
      <button className="BagelFatOne" style={{ fontSize: '50px', padding: '10px 25px' ,
      borderRadius: '20%'}} onClick={handleButtonClick}>Play</button>
      

    </div>

        </div>
        
      )}
    </div>
    
    











    <div className="footer">
  © 2023 CHICKY RUNNERS. All rights reserved.
</div>



</div>
    
</ThirdwebProvider>
    
  )
}