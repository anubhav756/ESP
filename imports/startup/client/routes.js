import React from 'react';
import { mount } from 'react-mounter';

// layouts
import Default from '/imports/ui/layouts/Default';

// pages
import App from '/imports/ui/pages/App';

FlowRouter.route('/', {
  name: 'app',
  action() {
    mount(Default, { children: <App /> });
  },
});
