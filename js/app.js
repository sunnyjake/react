ReactDOM.render(
    // React.createElement("h1", null, "Hello, world!"),
    <h1>Hello world!</h1>,
    document.getElementsByTagName("div")[0]
    // document.getElementById("test")
);

var articles = [
    {
        author: "Jimmy",
        text: "Some text",
        bigText: "Some text about the magazine"
    },
    {
        author: "Mia",
        text: "There is my article",
        bigText: "There is my article about some state"
    },
    {
        author: "Emma",
        text: "Another article",
        bigText: "Another article with more long text"
    }
];

// class Article extends React.Component{

// }

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function () {
        return {
            visible: false
        }
    },
    readMoreClick: function (e) {
        e.preventDefault();
        // this.state.visible = true;
        this.setState({ visible: true });
    },
    render: function () {
        var visible = this.state.visible;
        // console.log(this.props.data);
        return (
            <div className="article">
                <div className="author">{this.props.data.author}</div>
                <div className={'text ' + (this.state.visible ? 'hidden' : '')}>{this.props.data.text + "... "}</div>
                <a href="#" className={"linkShowMore " + (this.state.visible ? 'hidden' : '')} onClick={this.readMoreClick}>show more</a>
                <div className={"text_big " + (!this.state.visible ? 'hidden' : '')}>{this.props.data.bigText}</div>
            </div>
        )
    }
});

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function () {
        var articles;
        if (this.props.data.length) {
            articles = this.props.data.map((item, index) => {
                return (<div key={index}>
                    <Article data={item} />
                </div>)
            })
        }
        return (
            <div className="news">
                {articles}
                <strong>{'There are ' + this.props.data.length + ' news'}</strong>
            </div>
        )
    }
});

var TestInput = React.createClass({
    getInitialState: function () {
        return {
            model: ''
        }
    },
    liveSearch: function (e) {
        // console.log(e);
        // console.log(e.bubbles);
        // console.log(e.currentTarget.value);
        this.setState({ model: e.currentTarget.value });
    },
    getAlert: function(){
        alert(this.state.model);
    },
    render: function () {
        return (
            <div>
                <input className="textInput" value={this.state.model} onChange={this.liveSearch} id="test" placeholder="test" />
                <input type="button" value="Test" onClick={this.getAlert} />
                <span>{this.state.model}</span>
            </div>
        )
    }
})

var App = React.createClass({
    render: function () {
        return (
            <div className="container-fluid">
                <TestInput />
                <News data={articles} />
            </div>
        );
    }
});


ReactDOM.render(
    <App />,
    document.getElementById("news")
);