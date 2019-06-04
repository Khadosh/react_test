import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ Test }) => ({
  title: Test.title
});

const Test = ({ title }) => <div>{ title }</div>;

export default connect(mapStateToProps)(Test);