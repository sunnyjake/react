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

class Article extends React.Component{
    constructor(){
        super();
        this.state = {
            visible: false
        };
        this.readMoreClick = this.readMoreClick.bind(this);
    }
    readMoreClick(e){
        e.preventDefault();
        console.log(this);
        this.setState({visible: true})
    }
    // componentWillMount(){
    //     console.log("mount");
    // }
    // componentDidMount(){
    //     console.log("did mount")
    // }
    render(){
        return(
            <div className="article">
                <div className="author">{this.props.data.author}</div>
                <div className={'text ' + (this.state.visible ? 'hidden' : '')}>{this.props.data.text + "... "}</div>
                <a href="#" className={"linkShowMore " + (this.state.visible ? 'hidden' : '')} onClick={this.readMoreClick}>show more</a>
                <div className={"text_big " + (!this.state.visible ? 'hidden' : '')}>{this.props.data.bigText}</div>
            </div> 
        )
    }
}
Article.propTypes = {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    }

class Text extends Article {
    constructor(){
        super();
        this.readMoreClick = this.readMoreClick.bind(this);
    }
    readMoreClick(e){
        super.readMoreClick(e);
        console.log("text", this);
    }
    render(){
        return(
            <div>
                <p onClick={this.readMoreClick}>Text</p>
                </div>
        )
    }
}

// var Article = React.createClass({
//     propTypes: {
//         data: React.PropTypes.shape({
//             author: React.PropTypes.string.isRequired,
//             text: React.PropTypes.string.isRequired,
//             bigText: React.PropTypes.string.isRequired
//         })
//     },
//     getInitialState: function () {
//         return {
//             visible: false
//         }
//     },
//     readMoreClick: function (e) {
//         e.preventDefault();
//         // this.state.visible = true;
//         this.setState({ visible: true });
//     },
//     render: function () {
//         var visible = this.state.visible;
//         return (
//             <div className="article">
//                 <div className="author">{this.props.data.author}</div>
//                 <div className={'text ' + (this.state.visible ? 'hidden' : '')}>{this.props.data.text + "... "}</div>
//                 <a href="#" className={"linkShowMore " + (this.state.visible ? 'hidden' : '')} onClick={this.readMoreClick}>show more</a>
//                 <div className={"text_big " + (!this.state.visible ? 'hidden' : '')}>{this.props.data.bigText}</div>
//             </div>
//         )
//     }
// });

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
                <Text />
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
    liveSearchWithoutRender: function(e){
        console.log(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    },
    getAlert: function(){
        alert(this.state.model);
    },
    componentDidMount: function(){
        ReactDOM.findDOMNode(this.refs.myTestInput).focus();
    },
    render: function () {
        console.log("render", this);
        return (
            <div>
                <input className="textInput" value={this.state.model} onChange={this.liveSearch} id="test" placeholder="test" />
                <input defaultValue='' placeholder='Text' onChange={this.liveSearchWithoutRender} ref='myTestInput' />
                <input type="button" value="Test" onClick={this.getAlert} />
                <span>{this.state.model}</span>
            </div>
        )
    }
});

class Add extends React.Component {
    constructor(){
        super();
        this.state = {
            disabled: true
        };
        this.buttonEnable = this.buttonEnable.bind(this);
    }
    buttonEnable(e){
        if(e.target.checked){
            this.setState({disabled: false});
        }
        else{
            this.setState({disabled: true});
        }
        
    }
    render(){
        return(
            <div className='addNew'>
                <p>Add new article</p>
                <form className='add cf'>
                    <div className='form-group'>
                        <label htmlFor='name'>Author</label>
                    <input type='text' className='add__author' placeholder='Name' id='name' />
                    </div>
                    <div className='form-group'>
                    <label htmlFor='text'>Article</label>
                    <textarea id='text' />
                    </div>
                    <div className='form-group'>
                    <input type='checkbox' className='add__text' id='agree' onChange={this.buttonEnable} /><label htmlFor='agree'>I am agree with privacy policy</label>
                    </div>
                    <input type='button' className='add__btn' value='Add article' disabled={this.state.disabled ? true : false} />
                </form>
            </div>
        )
    }
}

var App = React.createClass({
    render: function () {
        return (
            <div className="container-fluid">
                <TestInput />
                <News data={articles} />
                <Add />
            </div>
        );
    }
});


ReactDOM.render(
    <App />,
    document.getElementById("news")
);