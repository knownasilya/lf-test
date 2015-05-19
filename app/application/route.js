import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    togglePanel: function (panelName) {
      console.log('in route');
      var activePanel = this.controller.get('activePanel');

      if (activePanel === panelName) {
        this.send('removePanel');
      }
      else {
        this.send('removePanel');
        this.send('showPanel', panelName);
      }
   },

   showPanel: function (panelName) {
      if (!panelName) {
        return console.warn('Invalid panel toggled');
      }

      let controller = this.getPanelController(panelName);

      if (controller) {
        controller.set('isOpen', true);
      }

      this.controller.set('activePanel', panelName);

      this.render('panels/' + panelName, {
        into: 'application',
        outlet: 'panel'
      });
    },

    removePanel: function () {
      var lastPanel = this.controller.get('activePanel');

      if (lastPanel) {
        let controller = this.getPanelController(lastPanel);

        if (controller) {
          controller.set('isOpen', false);
        }
      }

      this.controller.set('activePanel', undefined);

      this.disconnectOutlet({
        outlet: 'panel',
        parentView: 'application'
      });
    }
  },

  getPanelController(panelName) {
    try {
      var controller = this.controllerFor(`panels/${panelName}`);

      return controller;
    } catch(e) {
      // pass
    }
  }
});
