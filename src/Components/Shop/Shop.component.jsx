import React from 'react'
import CollectionsOverview from '../CollectionsOverview/CollectionsOverview.component'
import Collection from '../Collection/Collection.component'

import { Route } from 'react-router-dom'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'


class Shop extends React.Component{
  // console.log()

  unsubscribeFromAuth = null
  
  componentDidMount(){
    const collectionRef = firestore.collection('collections')

    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      console.log(collectionsMap)
    })
  }
  render() {  
    const { match } = this.props
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview}/>
        <Route path={`${match.path}/:collectionId`} component={Collection} />
      </div>
    )
  }
}

export default Shop