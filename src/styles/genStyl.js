import colr from './colr.js';

const genStyl = {
  columnFlex: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    flexBasis: 'auto'
  },
  bubbleBox:  {
    marginTop: '0.2rem',
    marginBottom: '0.2rem',
    opacity: '1',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: '80%',
    minHeight: '30px',
    padding: '0',
    borderRadius: '0.3rem',
    backgroundColor: colr.bubbleBg,
    boxShadow: '0.01rem 0.05rem 0 0 '+ colr.bubbleShadow
  },
  bubbleText: {
    flex: '1 1 auto',
    alignSelf: 'stretch',
    display: 'inline-block',
    minWidth: '5%',
    margin: '0',
    padding: '0.6rem 0.5rem',
    display: 'inline-block'
  },

  botbubbleFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  bubbleMarginPadding: {
    paddingTop: '2rem',
    marginLeft: '0.4rem',
    marginRight: '0.4rem'
  },

  inputOrButton: {
    display: 'inline-block',
    margin: '0.5rem 0.2rem',
    padding: '0.3rem',
    borderRadius: '0.3rem',
    boxShadow: '0.03rem 0.07rem 0 0 rgba(180, 180, 180, 0.5)',
    backgroundColor: colr.bubbleBg
  }
}

export default genStyl;
