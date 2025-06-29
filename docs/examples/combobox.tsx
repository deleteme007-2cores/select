/* eslint-disable no-console */
import React from 'react';
import Select, { Option } from 'rc-select';
import '../../assets/index.less';

class Combobox extends React.Component {
  state = {
    disabled: false,
    value: '',
    options: [],
  };

  textareaRef = React.createRef<HTMLTextAreaElement>();

  timeoutId: number;

  componentDidMount() {
    console.log('Ref:', this.textareaRef);
  }

  onChange = (value, option) => {
    console.log('onChange', value, option);
    this.setState({
      value,
    });
  };

  onKeyDown = (e) => {
    const { value } = this.state;
    if (e.keyCode === 13) {
      console.log('onEnter', value);
    }
  };

  onSelect = (v, option) => {
    console.log('onSelect', v, option);
  };

  onSearch = (text: string) => {
    console.log('onSearch:', text);
  };

  onAsyncChange = (value) => {
    window.clearTimeout(this.timeoutId);

    this.setState({
      options: [],
    });

    this.timeoutId = window.setTimeout(() => {
      this.setState({
        options: [{ value }, { value: `${value}-${value}` }],
      });
    }, 1000);
  };

  toggleDisabled = () => {
    const { disabled } = this.state;
    this.setState({
      disabled: !disabled,
    });
  };

  render() {
    const { value, disabled } = this.state;
    return (
      <div>
        <h2>combobox</h2>
        <p>
          <button type="button" onClick={this.toggleDisabled}>
            toggle disabled
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({ value: '' });
            }}
          >
            reset
          </button>
        </p>
        <Select
          value={value}
          mode="combobox"
          onChange={this.onChange}
          filterOption={(inputValue, option) => {
            if (!inputValue) {
              return true;
            }
            return (option.value as string).includes(inputValue);
          }}
        >
          {['1', '2', '3'].map((i) => (
            <Option value={i} key={i}>
              {i}
            </Option>
          ))}
        </Select>
        <div>
          <Select
            disabled={disabled}
            style={{ width: 500 }}
            onChange={this.onChange}
            onSelect={this.onSelect}
            onSearch={this.onSearch}
            onInputKeyDown={this.onKeyDown}
            notFoundContent=""
            allowClear
            placeholder="please input, max len: 10"
            value={value}
            maxLength={10}
            mode="combobox"
            backfill
            onFocus={() => console.log('focus')}
            onBlur={() => console.log('blur')}
          >
            <Option value="jack">
              <b style={{ color: 'red' }}>jack</b>
            </Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>
              disabled
            </Option>
            <Option value="yiminghe">yiminghe</Option>
            <Option value="竹林星光">竹林星光</Option>
          </Select>

          <h3>Customize Input Element</h3>
          <Select
            mode="combobox"
            style={{ width: 200 }}
            getInputElement={() => (
              <textarea style={{ background: 'red' }} rows={3} ref={this.textareaRef} />
            )}
            options={[{ value: 'light' }, { value: 'bamboo' }]}
            allowClear
            placeholder="2333"
          />

          <h3>Async Input Element</h3>
          <Select
            mode="combobox"
            notFoundContent={null}
            style={{ width: 200 }}
            options={this.state.options}
            onChange={this.onAsyncChange}
          />

          <h3>Active Option Filter - Middle Match</h3>
          <Select
            style={{ width: 500 }}
            showSearch
            allowClear
            mode="combobox"
            placeholder="Search value can be matched anywhere in the option's value. Try input 'ran'"
            activeOptionFilter={(searchValue, option) => {
              return String(option.value).includes(searchValue);
            }}
          >
            {['apple', 'banana', 'orange', 'grape'].map((i) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>

          <h3>No Active Highlight</h3>
          <Select
            style={{ width: 500 }}
            showSearch
            allowClear
            mode="combobox"
            placeholder="No option will be actively highlighted."
            activeOptionFilter={() => false}
          >
            {['apple', 'banana', 'orange', 'grape'].map((i) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    );
  }
}

export default Combobox;
/* eslint-enable */
