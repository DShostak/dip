// @flow

import NextRouter from 'next/router';

import AbstractRouterHistory, { type RouterHistoryMethod, type RouteParams } from './RouterHistory';
import Router from './Router';
import { trackPageView } from './Analytics';

class NextRouterHistory extends AbstractRouterHistory {
  isCordova: boolean;

  constructor(router: Router, isCordova: boolean = false) {
    super(router);

    this.isCordova = isCordova;
  }

  push(name: string, params: RouteParams = {}) {
    this.change('push', name, params);
  }

  replace(name: string, params: RouteParams = {}) {
    this.change('replace', name, params);
  }

  change(method: RouterHistoryMethod, name: string, params: RouteParams = {}) {
    const route = this.getRoute(name);
    const path = this.generatePath(name, params);

    const query = { routeName: route.name, ...params };
    NextRouter[method]({ pathname: '/main', query }, path);

    trackPageView(path);
  }
}

export default NextRouterHistory;
