import {connect} from "react-redux";
import Filter from "./Filter";
import {ReducerType} from "../../Store/store";
import {changeFilter} from "../../Store/reducer";

const mapStateToProps = (state: ReducerType) => {
    return {
        filter: state.tasks.filter
    }
}

export default connect(mapStateToProps, {changeFilter})(Filter)
