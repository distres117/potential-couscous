const commonStyles = {
    leftSide: '15%'
}

export const contentPanelStyles = {
    background:'white',
    paddingTop: '90px'
    //paddingLeft: commonStyles.leftSide
}

export const sidebarStyles = {
    position:'fixed',
    display: 'inline-block',
    marginLeft: 0,
    paddingLeft: '90px',
    marginTop: '-20px',
    width:commonStyles.leftSide,
    height:'100%',
    background: '#cac9c9'
}

export const formStyles = {
    marginTop: '10px'
}

export const tableStyles = {
    height: '75vh',
    overflowY:'scroll',
    overflowX:'hidden',
    padding:0
}

export const infoStyles = {
    marginBottom: '20px'
}
export const splitViews = {
    left:{
        display: 'inline-block',
        float: 'left',
        width: '50%',
        paddingRight: '5px',
        right:'75vh'
    },
    right:{
        display: 'inline-block',
        float: 'right',
        width:'50%',
        paddingLeft: '5px',
        height: '75vh'
    }
}