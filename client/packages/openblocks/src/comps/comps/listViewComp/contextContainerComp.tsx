import { withSelectedMultiContext } from "comps/generators/withSelectedMultiContext";
import { SimpleContainerComp } from "../containerBase/simpleContainerComp";

const ContextContainerTmpComp = withSelectedMultiContext(SimpleContainerComp);

export class ContextContainerComp extends ContextContainerTmpComp {}
