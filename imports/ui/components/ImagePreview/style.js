export default {
  nextButton: {
    position: 'fixed',
    bottom: 30,
    right: 30,
  },
  primaryContainer: {
    width: 600,
    height: 400,
  },
  primary: {
    borderRadius: 2,
  },
  secondaryWrapper: {
    marginTop: 40,
    display: 'inline-block',
  },
  secondaryContainer: {
    marginRight: 20,
    marginTop: 20,
    float: 'left',
    height: 107,
  },
  secondaryButton: {
    width: 160,
    height: 107,
  },
  secondary: selected => ({
    borderRadius: 2,
    opacity: selected ? 0.4 : 1,
  }),
};
