import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {TogglableUnitsBanner} from "./TogglableUnitsBanner.jsx";
import {UnitSystemConverters} from "./UnitSystemConverters.jsx";
import {nanoid} from "nanoid";
import {UnitSystem} from "./UnitSystem.jsx";

const meters_to_km = 1 / 1000;
let meters_to_cm = 100;
let meters_to_mm = 1000;
const metricSystem =
    [
        {
            name: "km",
            conversion_factor: meters_to_km
        },
        {
            name: "m",
            conversion_factor: 1
        },
        {
            name: "cm",
            conversion_factor: meters_to_cm
        },
        {
            name: "mm",
            conversion_factor: meters_to_mm
        }
    ]

const meters_to_miles = 0.000621371;
const meters_to_yards = 1.09361;
const meters_to_feet = 3.28084;
const meters_to_inches = 39.3701;
const imperialSystem =
    [
        {
            name: "mi",
            conversion_factor: meters_to_miles
        },
        {
            name: "yd",
            conversion_factor: meters_to_yards
        },
        {
            name: "ft",
            conversion_factor: meters_to_feet
        },
        {
            name: "in",
            conversion_factor: meters_to_inches
        }
    ]

TogglableUnitsBanner.propTypes = {
    div: PropTypes.bool,
    className: PropTypes.string
};

UnitSystemConverters.propTypes = {unitSystem: PropTypes.any};

export function UnitConverter() {
    const [meters, setMeters] = useState(1);

    function buildUnitState(inName) {
        return {
            name: inName,
            isActive: true
        }
    }

    function buildInitialUnitStates(unitSystem) {
        return unitSystem.map((unit) =>
            buildUnitState(unit.name)
        );
    }

    const [metricStates, setMetricStates] = useState(buildInitialUnitStates(metricSystem));
    const [imperialStates, setImperialStates] = useState(buildInitialUnitStates(imperialSystem));

    function updateUnitField(inMeters, unit) {
        const metersEl = document.querySelector("#" + unit.name)
        let exactValue = inMeters * unit.conversion_factor;
        const roundedValue = Math.round((exactValue + Number.EPSILON) * 100) / 100
        metersEl.value = roundedValue;
    }

    function updateUnitSystemFields(inMeters, unitSystem) {
        unitSystem.map(unit => updateUnitField(inMeters, unit));
    }

    function updateInputFields(inMeters) {
        updateUnitSystemFields(inMeters, metricSystem);
        updateUnitSystemFields(inMeters, imperialSystem);
    }

    useEffect(() => {
        updateInputFields(meters);
    }, [meters]);

    function fireMetersChanged(newMeters) {
        console.log("Meters changed??")
        setMeters(newMeters);
    }

    function toggleUnitInSystem(inUnitState, inSetState, inUnit) {
        inSetState(
            (oldValue) => {
                return oldValue.map(oldUnit =>
                    oldUnit.name === inUnit ?
                        {
                            name: oldUnit.name, isActive:
                                !oldUnit.isActive
                        } :
                        {...oldUnit}
                )
            }
        );
    }

    return <div className={"converter"}>
        <div className={"systemsBanner"}>
            <UnitSystem
                currentMeterSize={meters}
                unitSystem={metricSystem}
                toggleUnit={toggleUnitInSystem}
                fireMetersChanged={fireMetersChanged}
                unitStates={metricStates}
                setUnit={setMetricStates}
            />
            <div className={"verticalSeparator"}/>
            <UnitSystem
                currentMeterSize={meters}
                unitSystem={imperialSystem}
                toggleUnit={toggleUnitInSystem}
                fireMetersChanged={fireMetersChanged}
                unitStates={imperialStates}
                setUnit={setImperialStates}
            />
        </div>
    </div>;
}