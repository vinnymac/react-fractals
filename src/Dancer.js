import React, { Component } from 'react';
import { select as d3select, mouse as d3mouse } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

import Pythagoras from './Pythagoras';

function throttleWithRAF(fn) {
  let running = false
  return function () {
    if (running) return
    running = true
    window.requestAnimationFrame(() => {
      fn.apply(this, arguments)
      running = false
    })
  }
}

class Dancer extends Component {
    svg = {
        width: 1280,
        height: 600
    };
    state = {
        currentMax: 0,
        baseW: 80,
        heightFactor: 0,
        lean: 0
    };

    realMax = 11;

    componentDidMount() {
        d3select(this.svgRef).on("mousemove", this.onMouseMove);

        this.next();
    }

    render() {
        return (
          <svg width={this.svg.width} height={this.svg.height} ref={(c) => { this.svgRef = c }}>

            <Pythagoras w={this.state.baseW}
              h={this.state.baseW}
              heightFactor={this.state.heightFactor}
              lean={this.state.lean}
              x={this.svg.width/2-40}
              y={this.svg.height-this.state.baseW}
              lvl={0}
              maxlvl={this.state.currentMax}/>

          </svg>
        );
    }

    next = () => this.updateFromNext()

    updateFromNext = throttleWithRAF(function() {
        const { currentMax } = this.state;

        if (currentMax < this.realMax) {
            this.setState({currentMax: currentMax + 1});
            setTimeout(this.next, 500);
        }
    })

    onMouseMove = () => this.updateFromMouseMove(d3mouse(this.svgRef))

    updateFromMouseMove = throttleWithRAF(function([x, y]) {
        const scaleFactor = scaleLinear()
          .domain([this.svg.height, 0])
          .range([0, .8]);

        const scaleLean = scaleLinear()
          .domain([0, this.svg.width/2, this.svg.width])
          .range([.5, 0, -.5]);

        this.setState({
            heightFactor: scaleFactor(y),
            lean: scaleLean(x)
        });
    })
}

export default Dancer;
