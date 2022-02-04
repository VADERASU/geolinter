export const case_scripts = {
    state:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 700,
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
            "actions": false
        }
    }
}`,
county_unemployment:
`{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 700,
    "height": 400,
    "background": "#F3F8FB",
    "data": {
        "values": "county_unemployment",
        "format": {
        "type": "topojson",
        "feature": "counties"
        }
    },
    "transform": [{
        "lookup": "id",
        "from": {
            "data": {
                "values": "data/unemployment.tsv"
            },
            "key": "id",
            "fields": ["rate"]
        }
    }],
    "projection": {
        "type": "albersUsa"
    },
    "mark": "geoshape",
    "encoding": {
        "color": {
        "field": "rate",
        "type": "quantitative"
        }
    },
    "usermeta": {
        "embedOptions": {
            "actions": false
        }
    }
}`

};