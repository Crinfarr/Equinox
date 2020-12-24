const fs = require('fs');
var lights = [
    {
        "name": "VR Area East",
        "value": "VRAE"
    },
    {
        "name": "VR Area South",
        "value": "VRAS"
    },
    {
        "name": "Desk wash",
        "value": "DW"
    },
    {
        "name": "Bed wash",
        "value": "BW"
    },
    {
        "name": "VR Area North",
        "value": "VRAN"
    }
]
//TODO: convert COMMAND into a constructed object
module.exports = {
    debug: true,
    setup: false,
    token: "NzkxMDI4MzkwNTM0MzE2MDYz.X-JMmA.kKSZGRJBld55iqCcTp8flhzTCF4",
    commanddata: [
        /*         {
                    "name":"ListLights",
                    "description":"List all available lights" //taking this out now that slash commands can contain explanations
                }, */
        {
            "name": "light",
            "description": "Interact with the lights",
            "type": 2,
            "options": [
                {
                    "name": "on",
                    "description": "turn on a light",
                    "type": 1,
                    "options": [
                        {
                            "name": "id",
                            "description": "the light to turn on",
                            "type": 3,
                            "required": true,
                            "choices": lights
                        }
                    ]
                },
                {
                    "name": "off",
                    "description": "turn off a light",
                    "type": 1,
                    "options": [
                        {
                            "name": "id",
                            "description": "the light to turn on",
                            "type": 3,
                            "required": true,
                            "choices": lights
                        }
                    ]
                },
                {
                    "name": "rgb",
                    "description": "change the color of a light",
                    "type": 1,
                    "options": [

                    ]
                }
            ]
        },
    ]
}