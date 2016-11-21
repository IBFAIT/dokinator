import _ from 'lodash';

const templateing = ({template, vars}) => {
  let compiled = _.template(template);
  return compiled(vars);
}

export default templateing;
