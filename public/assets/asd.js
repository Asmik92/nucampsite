class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bootcamp: "Nucamp"
        };
    }

    render() {
        const course = "React";
        return (
            <span class="blue-box"><div>Nucamp{this.state.bootcamp}
            </div></span>
            <span class="orange-box"> React {this.state.course}
            </span>
        )
    }
}

ReactDOM.render(<Example />, document.getElementById('root'));
