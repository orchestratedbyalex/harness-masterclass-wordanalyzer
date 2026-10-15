import DefaultView from "../components/Form/Views/Default";
import ResultsView from "../components/Form/Views/Results";
import { FormView } from "../enums/FormView";

export class FormViewFactory {
    public static create = (view: FormView) => {
        switch (view) {
            case FormView.DEFAULT_VIEW:
                return <DefaultView />;
            case FormView.RESULTS_VIEW:
                return <ResultsView/>
        }
    }
}