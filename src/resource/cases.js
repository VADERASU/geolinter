export const case_scripts = {
    state:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 730,
    "height": 400,
    "background": "#F3F8FB",
    "data": {
        "values": "state_data",
        "format": {
            "property": "features"
        }
    },
    "mark": "geoshape",
    "projection": {
        "type": "albersUsa"
    },
    "encoding": {
        "stroke": {
            "value": "black"
        },
        "color": {
            "field": "id",
            "type": "quantitative"
        }         
    },
    "usermeta": {
        "embedOptions": {
            "actions": {
                "export": true,
                "source": false,
                "compiled": false,
                "editor": false
            }
        }
    }
}`,

};