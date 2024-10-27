import {nanoid} from "nanoid";

export function UnitSystemConverters(props) {
    function handleUnitChange(rawUnitValue, metersToUnitFactor) {
        props.fireMetersChanged(rawUnitValue / metersToUnitFactor);
    }

    function createConverterEl(unit, unitStates) {

        function pickVisibilityStyle(unit, unitStates) {
            const unitState = unitStates.find(unitState => unitState.name === unit.name)
            return unitState.isActive
        }

        const isVisible = pickVisibilityStyle(unit, unitStates);

        function calculateValue(currentMeterSize) {
            const exactValue = currentMeterSize * unit.conversion_factor;
            return Math.round((exactValue + Number.EPSILON) * 100) / 100

        }

        return <div className={"singleUnit"} style={(isVisible ? {} : {display:"None"})}
        key={nanoid()}>
            <input
                value = {calculateValue(props.currentMeterSize)}
                onChange={(event) =>
                handleUnitChange(event.target.value, unit.conversion_factor)}
                   key={nanoid()}
                   id={unit.name}
                   type={"number"}
                   className={"dimensionInput"}/>
            <label htmlFor={unit.name}
            key={nanoid()}>
                {unit.name}
            </label>
        </div>;
    }

    const convertersEls = props.unitSystem.map(unit => createConverterEl(unit, props.unitStates))

    return <div className="unitSystem">
        {convertersEls}
    </div>;
}