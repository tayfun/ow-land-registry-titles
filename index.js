'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Title = function (_React$Component) {
  _inherits(Title, _React$Component);

  function Title(props) {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).call(this, props));
  }

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var titleId = e('td', { key: 'titleId' }, this.props.titleId);
      var titleNumber = e('td', { key: 'titleNumber' }, this.props.titleNumber);
      var titleClass = e('td', { key: 'titleClass' }, this.props.titleClass);
      var titleIsFavorite = React.createElement('td', { key: 'titleIsFavorite', className: this.props.titleIsFavorite ? 'fav' : 'not-fav' });
      return e('tr', { key: this.props.titleId, id: this.props.index }, [titleId, titleNumber, titleClass, titleIsFavorite]);
    }
  }]);

  return Title;
}(React.Component);

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this2.state = { titleData: [], selectedTitle: null };
    _this2.dataUrl = 'https://raw.githubusercontent.com/orbitalwitness/tech-task/main/data/titles.json';
    return _this2;
  }

  _createClass(App, [{
    key: 'fetchTitles',
    value: function fetchTitles() {
      var _this3 = this;

      fetch(this.dataUrl).then(function (response) {
        return response.text();
      }).then(function (text) {
        _this3.setState({ titleData: JSON.parse(text) });
      }).catch(function (e) {
        console.log(e);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchTitles();
    }
  }, {
    key: 'rowClick',
    value: function rowClick(e) {
      if (!e.target.parentNode.id) {
        return;
      }
      var rowIndex = parseInt(e.target.parentNode.id);
      if (e.target.className == 'fav') {
        this.setState(function (_ref) {
          var titleData = _ref.titleData;
          return {
            titleData: [].concat(_toConsumableArray(titleData.slice(0, rowIndex)), [Object.assign({}, titleData[rowIndex], {
              isFavorite: false
            })], _toConsumableArray(titleData.slice(rowIndex + 1)))
          };
        });
      } else if (e.target.className == 'not-fav') {
        this.setState(function (_ref2) {
          var titleData = _ref2.titleData;
          return {
            titleData: [].concat(_toConsumableArray(titleData.slice(0, rowIndex)), [Object.assign({}, titleData[rowIndex], {
              isFavorite: true
            })], _toConsumableArray(titleData.slice(rowIndex + 1)))
          };
        });
      } else if (rowIndex != null) {
        this.setState({ selectedTitle: rowIndex });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var titlesTrArr = [];
      this.state.titleData.forEach(function (title, i) {
        return titlesTrArr.push(e(Title, { titleId: title['id'], titleNumber: title['titleNumber'], titleClass: title['titleClass'], titleIsFavorite: title['isFavorite'], titleContent: title['content'], key: title['id'], index: i }));
      });
      var titlesTable = React.createElement(
        'table',
        { onClick: function onClick(e) {
            _this4.rowClick(e);
          }, key: 'titlesTable' },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              'ID'
            ),
            React.createElement(
              'th',
              null,
              'Title Number'
            ),
            React.createElement(
              'th',
              null,
              'Class of Title'
            ),
            React.createElement(
              'th',
              null,
              'Fav?'
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          titlesTrArr
        )
      );
      var titlesDiv = e('div', { id: 'titles', key: 'titles', className: 'column' }, [titlesTable]);
      var titleDetails;
      if (this.state.selectedTitle != null) {
        titleDetails = e('div', { key: 'titleDetails' }, this.state.titleData[this.state.selectedTitle]['content']);
      }
      var titleDetailsDiv = e('div', { id: 'titleDetails', key: 'titleDetailsDiv', className: 'column' }, [titleDetails]);
      var menuDiv = e('div', { className: 'column', key: 'menuDiv' }, 'Titles');
      return [menuDiv, titlesDiv, titleDetailsDiv];
    }
  }]);

  return App;
}(React.Component);

var domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);