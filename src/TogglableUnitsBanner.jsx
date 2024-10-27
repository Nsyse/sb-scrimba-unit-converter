import {nanoid} from "nanoid";

export function TogglableUnitsBanner(props) {

    function pickColor(isActive) {
        return isActive ? "#539043" : "#a82626";
    }

    // eslint-disable-next-line react/prop-types
    const buttonList = props.unitStates.map((unit) => {
            const styles = {
                backgroundColor: pickColor(unit.isActive)
            }

            return <button
                className={"unitToggleButton"}
                key={nanoid()}
                style={styles}
                onClick={() => {
                    props.toggleUnit(props.unitStates, props.setUnit, unit.name)
                }}
            >
                {unit.name}
            </button>
        }
    )

    return <div className={"unitSystemToggles"}>
        {buttonList}
    </div>;
}