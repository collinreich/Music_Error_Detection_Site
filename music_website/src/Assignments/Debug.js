import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "../Scripts/history";
import "./../Styles/assignment.css";
import { withRouter } from "react-router-dom";
import Tmp from "./../Resources/Audio/Example1.m4a";
import example5 from "./../Resources/Images/Example1Display.png";
import example5Ans from "./../Resources/Images/Example1Answer.png";

import ImageMapper from "react-img-mapper";
import URL from "../Resources/Images/assignment-debug.jpg";
import mapJSON from "../Resources/JSON/debug.json";

var count;
var isPlaying = false;
var audio = new Audio(Tmp);

const imageStyle1 = {
    display: 'block'
};

const imageStyle2 = {
    display: 'none'
};

var IMAGE_MAP = {
    name: 'debug-map',
    areas: mapJSON
};

var isDisabled = false;


class Debug extends Component {
    constructor() {
        super();
        this.state = {
            imageWidth: 0,
        };
    }

    async componentDidMount() {
        this.setState({
            imageWidth: await this.getImageWidth(),
        });
    }

    RenderButtonAndSound = () => {
        audio.onended = function () {
            count++;
            isPlaying = false;
            console.log(count);
        };
        return (
            <Button
                onClick={() => {
                    if (count < 3) {
                        if (!isPlaying) {
                            audio.play();
                            isPlaying = true;
                            console.log("playing");
                        }
                    }
                    if (count === 2) {
                        alert("You can only play this sound one more time")
                    }
                    if (count === 3) {
                        alert("You have maxed out your attempts to play this sound")
                    }
                }
                }
                type="button"
                buttonStyle="btn--primary--solid"
                buttonSize="btn--medium"
            >Play Sound</Button>
        );
    };

    moveOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };

        this.setState({
            moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
        });

        document.getElementById("x-coordinate").innerText = `X coordinate is ${coords.x}`;
        document.getElementById("y-coordinate").innerText = `Y coordinate is ${coords.y}`;
        document.getElementById("coordinate-json").innerText = `Coordinate JSON is "coords": [${coords.x},${coords.y},20]`;
    }

    moveOnArea(area, evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };

        document.getElementById("x-coordinate").innerText = `X coordinate is ${coords.x}`;
        document.getElementById("y-coordinate").innerText = `Y coordinate is ${coords.y}`;
        document.getElementById("coordinate-json").innerText = `Coordinate JSON is "coords": [${coords.x},${coords.y},20]`;

        this.setState({
            hoveredArea: area,
            msg: `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
                area.coords
            )} !`
        });

        document.getElementById("shape-id").innerText = `Shape info: ID=${area.id}, isError=${area.isError}, errorType=${area.errorType}`;
    }

    clicked(area) {
        console.log(`You clicked shape ${area.id}, ${area.preFillColor} ${area.fillColor} ${area.strokeColor}`);

        const colorYellow = "#e3fc0080";
        const colorRed = "#fc110080";
        const colorBlue = "#1500fc80";
        const colorGreen = "#00fc4380";

        //console.log(`IMAGE_MAP.areas=${JSON.stringify(IMAGE_MAP.areas)}`);

        for (let i = 0; i < IMAGE_MAP.areas.length; i++) {
            //console.log(`IMAGE_MAP.areas[${i}]=${JSON.stringify(IMAGE_MAP.areas[i])}`);

            if (IMAGE_MAP.areas[i].id == area.id) {
                console.log(`match`);
                console.log(`IMAGE_MAP.areas[${i}]=${JSON.stringify(IMAGE_MAP.areas[i])}`);

                if (area.fillColor == colorRed) {
                    console.log(`colorRed`);
                    //area.fillColor = colorBlue;
                    IMAGE_MAP.areas[i].fillColor = colorBlue;
                    IMAGE_MAP.areas[i].preFillColor = colorBlue;
                } else if (area.fillColor == colorBlue) {
                    console.log(`colorBlue`);
                    //area.fillColor = colorGreen;
                    IMAGE_MAP.areas[i].fillColor = colorGreen;
                    IMAGE_MAP.areas[i].preFillColor = colorGreen;
                } else if (area.fillColor == colorGreen) {
                    console.log(`colorGreen`);
                    //area.fillColor = colorYellow;
                    IMAGE_MAP.areas[i].fillColor = colorYellow;
                    IMAGE_MAP.areas[i].preFillColor = colorYellow;
                } else if (area.fillColor == colorYellow) {
                    console.log(`colorYellow`);
                    //area.fillColor = colorRed;
                    IMAGE_MAP.areas[i].fillColor = colorRed;
                    IMAGE_MAP.areas[i].preFillColor = colorRed;
                } else {
                    console.log(`other`);
                    //area.fillColor = colorYellow;
                    IMAGE_MAP.areas[i].fillColor = colorYellow;
                    IMAGE_MAP.areas[i].preFillColor = colorYellow;
                }
            }
        }



        //area.userSelection = "someError";
        //area.preFillColor = "#04b533";
        //area.fillColor = "#04b533";
        //area.strokeColor = "#04b533";

        this.setState({
            msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
                area.coords
            )} !`
        });

        // const content = document.getElementById("image-mapper-div").innerHTML;
        // document.getElementById("image-mapper-div").innerHTML = content;
    }

    async getImageWidth() {
        var img = new Image();

        img.onload = async function () {
            return img.width;
        };

        img.src = URL;

        return img.onload();
    }

    render() {
        if (!count) {
            count = 0;
        }

        return (
            <div id="assignment-debug" className="assignment">
                <h2>Debug</h2>
                <div className="Instructions">
                    <h2>Instructions:  Click the "Play Sound" button to hear the music.
                        You will only be able to play the sound 3 times. After listening to the music,
                        place the hotspots over each note error. There are 3 different types of errors:
                        Pitch Error (Red), Rhythm Error (Blue), and Intonation Error (Green).
                        <br></br>
                        <br></br>
                        How to select the errors:
                        <br></br>
                        1. todo
                        <br></br>
                        2. todo
                        <br></br>
                        3. todo
                        <br></br>
                        4. todo
                        <br></br>
                        5. todo</h2>
                </div>
                <input id = "inc" value = "0" hidden></input>
                {this.RenderButtonAndSound()}

                <Button
                    onClick={() => {
                        isDisabled = !isDisabled;
                    }
                    }
                    type="button"
                    buttonStyle="btn--pitch--solid"
                    buttonSize="btn--medium"
                >Test</Button>

                <br></br>

                <br></br>

                <div>
                    <p>Color Coding Key</p>
                    <p>Pitch errors are represented by RED, Hex is #fc110080 (80 means 50% transparency)</p>
                    <p>Rhythm errors are represented by BLUE, Hex is #1500fc80 (80 means 50% transparency)</p>
                    <p>Intonation errors are represented by GREEN, Hex is #00fc4380 (80 means 50% transparency)</p>
                </div>

                <br></br>

                <div id="debug-information">
                    Debug Information
                </div>

                <div id="x-coordinate">
                    X coordinate is unknown
                </div>

                <div id="y-coordinate">
                    Y coordinate is unknown
                </div>

                <div id="coordinate-json">
                    Coordinate JSON is unknown
                </div>

                <div id="shape-id">
                    Shape info: unknown
                </div>

                <br></br>

                <div id="instructions">
                    New Instructions
                    <li>test</li>
                    <li>test</li>
                </div>

                <br></br>

                <div id="image-mapper-div" className="image-mapper">
                    <ImageMapper
                        id="mapper-debug"
                        src={URL}
                        map={IMAGE_MAP}
                        onImageMouseMove={evt => this.moveOnImage(evt)}
                        onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                        onClick={area => this.clicked(area)}
                        stayMultiHighlighted={true}
                        //toggleHighlighted={true}
                        disabled={isDisabled}
                        width={window.innerWidth}
                        imgWidth={this.state.imageWidth}
                    />
                </div>

                <br></br>

                <div className="radio-buttons" style={{ marginTop: 50 + 'px' }}>
                    <input type="radio" name="clickType" value="" onClick={() => console.log(`radio button 1 was clicked`)} />Default
                    <input type="radio" name="clickType" value="" onClick={() => console.log(`radio button 2 was clicked`)} />JSON generator
                </div>

                <br></br>
                <Button
                    onClick={() => {
                        history.push('/');
                        history.go();
                    }
                    }
                    type="button"
                    buttonStyle="btn--primary--solid-go-back"
                    buttonSize="btn--medium"
                >Back</Button>

                <Button id='reset'
                    onClick={() => {
                        if (window.confirm("Are you sure you want to reset?")) {
                            window.location.reload(false);
                        }
                    }
                    }
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--medium"
                >Reset</Button>

                <Button id='submit'
                    onClick={() => {
                        let pitchErrorsCorrect = 0;
                        let pitchErrorsMissed = 0;
                        let rhythmErrorsCorrect = 0;
                        let rhythmErrorsMissed = 0;
                        let intonationErrorsCorrect = 0;
                        let intonationErrorsMissed = 0;

                        let noErrorsCorrect = 0;
                        let noErrorsMissed = 0;

                        for (let shape of IMAGE_MAP.areas) {
                            console.log(`shape=${JSON.stringify(shape)}`);

                            // Check if the shape's fill color is correct
                            if (shape.errorType == "pitchError") {
                                if (shape.fillColor == "#fc110080") {
                                    console.log(`pitchError correct`);
                                    pitchErrorsCorrect += 1;
                                } else {
                                    console.log(`pitchError incorrect`);
                                    pitchErrorsMissed += 1;
                                }
                            } else if (shape.errorType == "intonationError") {
                                if (shape.fillColor == "#00fc4380") {
                                    console.log(`intonationError correct`);
                                    intonationErrorsCorrect += 1;
                                } else {
                                    console.log(`intonationError incorrect`);
                                    intonationErrorsMissed += 1;
                                }
                            } else if (shape.errorType == "rhythmError") {
                                if (shape.fillColor == "#1500fc80") {
                                    console.log(`rhythmError correct`);
                                    rhythmErrorsCorrect += 1;
                                } else {
                                    console.log(`rhythmError incorrect`);
                                    rhythmErrorsMissed += 1;
                                }
                            } else if (shape.errorType == undefined) {
                                if (shape.fillColor == "#e3fc0080") {
                                    console.log(`noError correct`);
                                    noErrorsCorrect += 1;
                                } else {
                                    console.log(`noError incorrect`);
                                    noErrorsMissed += 1;
                                }
                            }

                            let totalCorrect = pitchErrorsCorrect + rhythmErrorsCorrect + intonationErrorsCorrect + noErrorsCorrect;
                            let totalMissed = pitchErrorsMissed + rhythmErrorsMissed + intonationErrorsMissed + noErrorsMissed;

                            // Create a basic report
                            document.getElementById("results").innerText = `Results\n There are ${IMAGE_MAP.areas.length} shapes\n pitchErrorsCorrect=${pitchErrorsCorrect}, pitchErrorsMissed=${pitchErrorsMissed}\n intonationErrorsCorrect=${intonationErrorsCorrect}, intonationErrorsMissed=${intonationErrorsMissed}\n rhythmErrorsCorrect=${rhythmErrorsCorrect}, rhythmErrorsMissed=${rhythmErrorsMissed}\n noErrorsCorrect=${noErrorsCorrect}, noErrorsMissed=${noErrorsMissed} \n totalCorrect=${totalCorrect}/${IMAGE_MAP.areas.length}\n totalMissed=${totalMissed}/${IMAGE_MAP.areas.length}`;
                        }
                    }
                    }
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--medium"
                >Submit</Button>

                <br></br>

                <br></br>

                <div id="results">
                    Results
                </div>
            </div>
        );
    }
}

export default withRouter(Debug);