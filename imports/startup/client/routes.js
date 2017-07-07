import React from 'react';
import { mount } from 'react-mounter';

// layouts
import Default from '/imports/ui/layouts/Default';

// pages
import App from '/imports/ui/pages/App';
import Login from '/imports/ui/pages/Login';
import SignUp from '/imports/ui/pages/SignUp';

FlowRouter.route('/', {
  name: 'App',
  action() {
    mount(Default, { children: <App /> });
  },
});

FlowRouter.route('/login', {
  name: 'Login',
  action() {
    mount(Default, { children: <Login /> });
  },
});

FlowRouter.route('/signup', {
  name: 'SignUp',
  action() {
    mount(Default, { children: <SignUp /> });
  },
});
