import PropTypes from 'prop-types';

const ingredientType = PropTypes.shape({
  side: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}).isRequired

export default ingredientType;