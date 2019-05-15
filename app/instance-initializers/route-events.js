import EmberRouter from '@ember/routing/router';
import {scheduleOnce} from '@ember/runloop';

const TRACING_KEYWORD = 'tracing';

/**
 * Transition to about:blank after paint
 */
function endTrace(shouldRedirect) {
  // just before paint
  window.requestAnimationFrame(() => {
    // after paint
    window.requestAnimationFrame(() => {
      performance.mark('renderEnd');
      performance.measure('renderPhase', 'renderStart', 'renderEnd');
      performance.mark('pltOverride');

      if (shouldRedirect) {
        document.location.href = 'about:blank';
      }
    });
  });
}

export function initialize() {
  EmberRouter.reopen({
    init() {
      this._super(...arguments);

      this.on('routeWillChange', () => {
        performance.mark('transitionStart');
      });

      this.on('routeDidChange', () => {
        scheduleOnce('afterRender', () => {
          performance.mark('transitionEnd');
          performance.measure('transitionPhase', 'transitionStart', 'transitionEnd');
          performance.mark('renderStart');

          // http://localhost:5555#?tracing
          const tracingExistInHash = window.location.hash.indexOf(TRACING_KEYWORD) > -1;
          // http://localhost:5555?tracing
          const tracingExistInSearch = window.location.search.indexOf(TRACING_KEYWORD) > -1;
          if (tracingExistInHash || tracingExistInSearch) {
            endTrace(true);
          } else {
            endTrace(false);
          }
        });
      })
    },
  });
}

export default {
  name: 'route-events',
  initialize
};
