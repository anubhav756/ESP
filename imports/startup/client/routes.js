import React from 'react';
import { mount } from 'react-mounter';

// layouts
import Default from '/imports/ui/layouts/Default';

// pages
import Main from '/imports/ui/pages/Main';
import Login from '/imports/ui/pages/Login';
import SignUp from '/imports/ui/pages/SignUp';

FlowRouter.route('/', {
  name: 'Main',
  action() {
    mount(Default, { children: <Main /> });
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
