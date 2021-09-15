import {connect} from "react-redux";
import Search from "./Search";
import {setSearch} from "../../Store/reducer";
import {ReducerType} from "../../Store/store";

const mapStateToProps = (state: ReducerType) => {
    return {
        search: state.tasks.search
    }
}

export default connect(mapStateToProps, {setSearch})(Search)
