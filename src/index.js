'use strict';

const e = React.createElement;

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var titleId = e('td', {key: 'titleId'}, this.props.titleId)
    var titleNumber = e('td', {key: 'titleNumber'}, this.props.titleNumber)
    var titleClass = e('td', {key: 'titleClass'}, this.props.titleClass)
    var titleIsFavorite = (
      <td key='titleIsFavorite' className={this.props.titleIsFavorite? 'fav':'not-fav'}>
      </td>
    )
    return e('tr', {key: this.props.titleId, id: this.props.index}, [titleId, titleNumber, titleClass, titleIsFavorite])
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { titleData: [], selectedTitle: null};
    this.dataUrl = 'https://raw.githubusercontent.com/orbitalwitness/tech-task/main/data/titles.json'
  }

  fetchTitles() {
    fetch(this.dataUrl)
      .then(response => {
        return response.text()
      })
      .then(text => {
        this.setState({titleData: JSON.parse(text)})
      })
      .catch(e => {
        console.log(e)
      })
  }

  componentDidMount() {
    this.fetchTitles()
  }

  rowClick(e) {
    if (!e.target.parentNode.id) {
      return
    }
    const rowIndex = parseInt(e.target.parentNode.id)
    if (e.target.className == 'fav') {
      this.setState(({titleData}) => ({
        titleData: [
          ...titleData.slice(0, rowIndex),
          {
            ...titleData[rowIndex],
            isFavorite: false,
          },
          ...titleData.slice(rowIndex + 1)
        ]
      }))
    } else if (e.target.className == 'not-fav') {
      this.setState(({titleData}) => ({
        titleData: [
          ...titleData.slice(0, rowIndex),
          {
            ...titleData[rowIndex],
            isFavorite: true,
          },
          ...titleData.slice(rowIndex + 1)
        ]
      }))
    } else if (rowIndex != null) {
      this.setState({selectedTitle: rowIndex})
    }
  }

  render() {
    var titlesTrArr = []
    this.state.titleData.forEach(
      (title, i) => titlesTrArr.push(
        e(
          Title,
          {titleId: title['id'], titleNumber: title['titleNumber'], titleClass: title['titleClass'], titleIsFavorite: title['isFavorite'], titleContent: title['content'], key: title['id'], index: i}
        )
      )
    )
    var titlesTable = (
      <table onClick={(e) => {this.rowClick(e)}} key='titlesTable'>
        <thead>
          <tr><th>ID</th><th>Title Number</th><th>Class of Title</th><th>Fav?</th></tr>
        </thead>
        <tbody>
        {titlesTrArr}
        </tbody>
      </table>
    )
    var titlesDiv = e(
      'div',
      {id: 'titles', key: 'titles', className: 'column'},
      [titlesTable],
    )
    var titleDetails;
    if (this.state.selectedTitle != null) {
      titleDetails = e(
        'div',
        {key: 'titleDetails'},
        this.state.titleData[this.state.selectedTitle]['content']
      )
    }
    var titleDetailsDiv = e(
      'div',
      {id: 'titleDetails', key: 'titleDetailsDiv', className: 'column'},
      [titleDetails]
    )
    var menuDiv = e(
      'div',
      {className: 'column', key: 'menuDiv'},
      'Titles'
    )
    return [menuDiv, titlesDiv, titleDetailsDiv]
  }

}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);
