import React from "react";
import blurBackgroung from '../../images/blur-background.jpeg'
import FruitNinja from '../../images/FruitNinja.png'
import './homepage.css'
import pig from '../../images/pig.png'
import preview1 from '../../images/preview1.png'
import preview2 from '../../images/preview2.png'
import lightbackground from '../../images/light-background.png'
import whitebackground from '../../images/whitebackground.png'
import { BrowserView, MobileView } from 'react-device-detect'
import { MouseParallaxChild, MouseParallaxContainer } from "react-parallax-mouse";

function Homepage() {

    return (
        <div>
            <MouseParallaxContainer className="logo-container">
                <img src={blurBackgroung} className="logo-background"></img>
                <MouseParallaxChild
                    factorX={-0.2}
                    factorY={-0.2}
                    style={{
                        height: "100%"
                    }}
                >
                    <img src={FruitNinja} className="logo"></img>
                </MouseParallaxChild>
                
                <div className="mouse-container"></div>
            </MouseParallaxContainer>
            <BrowserView>
                <div className="content-container">
                    <img src={pig} className="content-image"></img>
                    <div>
                        <div className="content-header">Slice fruit. Avoid bombs. That’s all you need to know to play Crypto Ninja!</div>
                        <div className="content-body">Challenge yourself and see how long you can last in Classic
                            mode, set a high score in Arcade mode or simply practise your
                            fruit-slicing skills in Zen mode. A wide range of blades and
                            dojos are at your disposal to help you cut your way to the top.
                            There has never been a better time to play Crypto Ninja,
                            so unsheathe your sword and get ready for an addictive, action-packed gaming experience!
                        </div>
                        <div className="content-action-container">
                            <div className="content-action-button">Play Now</div>
                            <div className="content-action-button">Download</div>
                        </div>
                    </div>
                </div>
            </BrowserView>
            <MobileView>
                <div className="content-container mobile">
                    <img src={pig} className="content-image"></img>
                    <div>
                        <div className="content-header mobile">Slice fruit. Avoid bombs. That’s all you need to know to play Crypto Ninja!</div>
                        <div className="content-body mobile">Challenge yourself and see how long you can last in Classic
                            mode, set a high score in Arcade mode or simply practise your
                            fruit-slicing skills in Zen mode. A wide range of blades and
                            dojos are at your disposal to help you cut your way to the top.
                            There has never been a better time to play Crypto Ninja,
                            so unsheathe your sword and get ready for an addictive, action-packed gaming experience!
                        </div>
                        <div className="content-action-container">
                            <div className="content-action-button">Play Now</div>
                            <div className="content-action-button">Download</div>
                        </div>
                    </div>
                </div>
            </MobileView>
            <MobileView>
                <div className="slider-container mobile ">
                    <div className="slider-header">GamePlay Screenshots</div>
                    <div className="slider-header1">Witness the game in action</div>
                    <div className="slider-preview mobile">
                        <img className="slider-image mobile" src={preview1}></img>
                        <img className="slider-image mobile" src={preview2}></img>
                    </div>
                </div>
                <div className="social-media-container mobile">
                    <div className="social-media-header">Join the conversation.</div>
                    <div className="sub-title">Be part of our growing community! Swap tips, chat characters or simply just keep up to date.</div>
                    <div className="social-media-button">Discord</div>
                </div>
            </MobileView>
            <BrowserView>
                <div className="slider-container">
                    <div className="slider-header">GamePlay Screenshots</div>
                    <div className="slider-header1">Witness the game in action</div>
                    <div className="slider-preview">
                        <img className="slider-image" src={preview1}></img>
                        <img className="slider-image" src={preview2}></img>
                    </div>
                </div>
                <div className="social-media-container ">
                    <div className="social-media-header">Join the conversation.</div>
                    <div className="sub-title">Be part of our growing community! Swap tips, chat characters or simply just keep up to date.</div>
                    <div className="social-media-button">Discord</div>
                </div>
            </BrowserView>
        </div>
    )
}

export default Homepage;