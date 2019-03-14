import React, {Component} from 'react';
import TableRowComponent from './table_row_component';

const estimatedItemHeight = 10
const buffer = 20

export default class TableComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      startOffset: 0,
      endOffset: 0,
      visibleData: []
    }

    this.data = props.data

    this.startIndex = 0
    this.endIndex = 0
    this.scrollTop = 0

    this.cache = []
    this.targetElement = { // first element in the visible area
      index: 0,
      top: 0,
      bottom: 0
    }

    this.doc = window.document.body.scrollTop ? window.document.body : window.document.documentElement

    this.handleScroll = this.handleScroll.bind(this)
    this.cachePosition = this.cachePosition.bind(this)
  }

  handleScroll(e) {
    const scrollTop = this.doc.scrollTop
    if (scrollTop > this.scrollTop) {
      if (scrollTop > this.targetElement.bottom) { // scroll down
        this.updateBoundaryIndex(scrollTop)
        this.updateVisibleData()
      }
    } else if (scrollTop < this.scrollTop) { // scroll up
      if (scrollTop < this.targetElement.top) {
        this.updateBoundaryIndex(scrollTop)
        this.updateVisibleData()
      }
    }
    this.scrollTop = scrollTop
  }

  cachePosition(node, index) {
    const rect = node.getBoundingClientRect() //get the measure React component size
    const top = rect.top + window.pageYOffset

    this.cache.push({
        index,
        top,
        bottom: top + rect.height
      })
  }

  updateBoundaryIndex(scrollTop) { //measure the bound index(startInde, endIndex)
    scrollTop = scrollTop || 0
    const targetElement = this.cache.find(item => item.bottom >= scrollTop)

    this.targetElement = {
      ...targetElement
    }

    this.startIndex = this.targetElement.index
    this.endIndex = this.startIndex + this.visibleCount
  }

  updateVisibleData() { //get the visibledata under bound index
    const visibleData = this.data.slice(this.startIndex, this.endIndex)
    this.setState({
      startOffset: this.targetElement.top,
      endOffset: (this.data.length - this.endIndex) * estimatedItemHeight,
      visibleData
    })
  }

  componentDidMount() {
    this.visibleCount = Math.ceil(window.innerHeight / estimatedItemHeight) + buffer
    this.endIndex = this.startIndex + this.visibleCount
    this.updateVisibleData()
    window.addEventListener('scroll', this.handleScroll, false)
  }

  renderRow() {
    const {visibleData} = this.state
    const rowItem = visibleData.map((item, index) => {
      return (
        <TableRowComponent
          cachePosition={this.cachePosition}
          key={this.startIndex + index}
          item={item}
          index={this.startIndex + index}/>
      )
    })
    return rowItem
  }

  render() {
    const {startOffset, endOffset} = this.state
    return (
      <div className='divTable GridTable' ref={node => { this.wrapper = node }}>
        <div className='divTableBody' style={{ paddingTop: `${startOffset}px`, paddingBottom: `${endOffset}px` }}>
          {this.renderRow()}
        </div>
      </div>
    )
  }
}
