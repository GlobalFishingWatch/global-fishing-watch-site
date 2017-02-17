import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import _ from 'lodash';
import Promise from 'promise-polyfill';
import 'styles/global.scss';
import faqReducer from 'reducers/faq';
import coverPageReducer from 'reducers/coverPage';
import definitionReducer from 'reducers/definitions';
import userReducer from 'reducers/user';
import contactReducer from 'reducers/contact';
import articlesPublicationsReducer from 'reducers/articlesPublications';
import { triggerAnalyticsPageView } from 'actions/user';
import Routes from './routes';

// Polyfill for older browsers (IE11 for example)
window.Promise = window.Promise || Promise;
/**
 * Reducers
 * @info(http://redux.js.org/docs/basics/Reducers.html)
 * @type {Object}
 */
const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  faqEntries: faqReducer,
  coverPageEntries: coverPageReducer,
  contactStatus: contactReducer,
  definitions: definitionReducer,
  articlesPublications: articlesPublicationsReducer
});

const middlewareRouter = routerMiddleware(browserHistory);

/**
 * Global state
 * @info(http://redux.js.org/docs/basics/Store.html)
 * @type {Object}
 */
const store = createStore(
  reducer,
  applyMiddleware(middlewareRouter, thunk)
);

/**
 * HTML5 History API managed by React Router module
 * @info(https://github.com/reactjs/react-router/tree/master/docs)
 * @type {Object}
 */
const history = syncHistoryWithStore(browserHistory, store);

history.listen((location) => {
  store.dispatch(triggerAnalyticsPageView(location.pathname));

  // SF Pardot
  const absoluteURL = `http://globalfishingwatch.org${location.pathname}`;
  if (window.piTracker) {
    window.piTracker(absoluteURL);
  }

  // attach page name to title
  const title = ['Global Fishing Watch'];
  const pageTitle = _.capitalize(location.pathname.replace('/', '').replace('-', ' '));
  if (pageTitle !== '') title.push(pageTitle);
  document.title = title.join(' - ');
});

render(
  <Provider store={store} >
    <Routes history={history} />
  </Provider>,
  document.getElementById('app')
);
