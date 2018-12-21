import '../assets/styles/footer.styl'

export default{
    data(){
        return{
            anthor:'xiao dai'
        }
    },
    render(){
        return(
            <div id="footer">
                <span>Written by{this.anthor}</span>
            </div>
        )
    }
}