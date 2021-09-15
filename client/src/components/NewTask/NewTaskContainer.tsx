import {connect} from "react-redux";
import NewTask from "./NewTask";
import {saveTask} from "../../Store/reducer";

export default connect(null, {saveTask})(NewTask)
