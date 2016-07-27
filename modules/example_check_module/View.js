/**
 * An example check module component:
 * It just has a paragraph that displays the check status (default is UNCHECKED),
 * and a button to change it to RETAINED.
 */

// Get the Translation Core Module API
const api = window.ModuleApi;

// Get the React and ReactBootstrap libraries from the API
const React = api.React;
const ReactBootstrap = api.ReactBootstrap;

const NAMESPACE = 'ExampleChecker';

class View extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      currentCheck: null
    };
    
    // Bind the function to the View object so the "this" context isn't lost
    this.retainedButtonClicked = this.retainedButtonClicked.bind(this);
  }
  
  componentWillMount() {
    this.updateState();
  }
  
  componentWillUnmount() {
    
  }
  
  retainedButtonClicked() {
    
  }
  
  updateCheckStatus(exampleCheckData, action) {
    var currentCheckFromStore = exampleCheckData.groups[exampleCheckData.currentGroupIndex]['checks'][exampleCheckData.currentCheckIndex];
    if (currentCheckFromStore.checkStatus) {
      currentCheckFromStore.checkStatus = action.checkStatus;
      api.emitEvent('changedCheckStatus', {currentCheckNamespace: NAMESPACE});
    }
    this.setState({
      currentCheck: currentCheckFromStore
    });
  }
  
  /**
   * @description - This method grabs the information that is currently in the
   * store and uses it to update our state, which in turn updates our view. This method is
   * typically called after the store is updated so that our view updates to the latest
   * data found in the store
   */
  updateState() {
    var currentGroupIndex = api.getDataFromCheckStore(NAMESPACE, 'currentGroupIndex');
    var currentCheckIndex = api.getDataFromCheckStore(NAMESPACE, 'currentCheckIndex');
    var currentCheck = api.getDataFromCheckStore(NAMESPACE, 'groups')[currentGroupIndex]['checks'][currentCheckIndex];
    var currentWord = api.getDataFromCheckStore(NAMESPACE, 'groups')[currentGroupIndex].group;
    this.setState({
        currentCheck: currentCheck
    });
    // TODO: include TPane?
    // api.emitEvent('goToVerse', {chapterNumber: currentCheck.chapter, verseNumber: currentCheck.verse});
  }
  
  render() {
    return (
      <div>
        <p>{this.state.currentCheck.textToCheck}</p>
        <p>{this.state.currentCheck.checkStatus}</p>
        <button onClick={this.retainedButtonClicked}>Retained</button>
      </div>
    );
  }
}

module.exports = {
  name: NAMESPACE,
  view: View
}