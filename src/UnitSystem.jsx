import {TogglableUnitsBanner} from "./TogglableUnitsBanner.jsx";
import {UnitSystemConverters} from "./UnitSystemConverters.jsx";
import {nanoid} from "nanoid";

export function UnitSystem(props) {
    return (
        <div className={"unitConverter"}>
            <TogglableUnitsBanner
                unitStates={props.unitStates}
                toggleUnit={props.toggleUnit}
                setUnit={props.setUnit}
            />
            <UnitSystemConverters
                currentMeterSize={props.currentMeterSize}
                unitStates={props.unitStates}
                unitSystem={props.unitSystem}
                fireMetersChanged={props.fireMetersChanged}
                key={nanoid()}
            />
        </div>
    )
}