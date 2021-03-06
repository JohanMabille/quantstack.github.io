## Introduction

`xeus` is a library meant to facilitate the implementation of kernels for Jupyter. It takes the
burden of implementing the Jupyter Kernel protocol so developers can focus on implementing the
interpreter part of the kernel.

## Installation

`xeus` has been packaged on all platforms for the conda package manager.

```
conda install xeus -c conda-forge
```

## Usage

`xeus` enables custom kernel authors to implement Jupyter kernels more easily. It takes the burden of implementing the Jupyter Kernel protocol so developers can focus on implementing the interpreter part of the Kernel.

The easiest way to get started with a new kernel is to inherit from the base interpreter class `xeus::xinterpreter` and implement the private virtual methods:

- `execute_request_impl`
- `complete_request_impl` 
- `inspect_request_impl`
- `history_request_impl`
- `is_complete_request_impl`

as seen in the echo kernel provided as an example.


```cpp
#include "xeus/xinterpreter.hpp"

using xeus::xinterpreter;
using xeus::xjson;
using xeus::xhistory_arguments;

namespace echo_kernel
{
    class echo_interpreter : public xinterpreter
    {

    public:

        echo_interpreter() = default;
        virtual ~echo_interpreter() = default;

    private:

        xjson execute_request_impl(int execution_counter,
                                   const std::string& code,
                                   bool silent,
                                   bool store_history,
                                   const xjson::node_type* user_expressions,
                                   bool allow_stdin) override;

        xjson complete_request_impl(const std::string& code,
                                    int cursor_pos) override;

        xjson inspect_request_impl(const std::string& code,
                                   int cursor_pos,
                                   int detail_level) override;

        xjson history_request_impl(const xhistory_arguments& args) override;

        xjson is_complete_request_impl(const std::string& code) override;

        xjson kernel_info_request_impl() override;

        void input_reply_impl(const std::string& value) override;
    };
}
```

Kernel authors can then rebind to the native APIs of the interpreter that is being interfaced, providing richer information than with the classical approach of a wrapper kernel capturing textual output.

## Building from Source

`xeus` depends on the following libraries:

 - [`libzmq`](https://github.com/zeromq/libzmq) ^4.2.1, [`cppzmq`](https://github.com/zeromq/cppzmq), [`rapidjson`](https://github.com/miloyip/rapidjson) and [`cryptopp`](https://github.com/weidai11/cryptopp).

On Linux platforms, `xeus` also requires `libuuid`, which is available in all linux distributions (`uuid-dev` on Debian).

We have packaged all these dependencies for the conda package manager. The simplest way to install them with
conda is to run:

```bash
conda install cmake zeromq cppzmq rapidjson cryptopp -c conda-forge
```

On Linux platform, you will also need:

```bash
conda install libuuid -c conda-forge
```

Once you have installed the dependencies, you can build and install `xeus`:

```bash
cmake -D BUILD_EXAMPLES=ON -D CMAKE_BUILD_TYPE=Release
make
make install
```

If you need the `xeus` library only, you can omit the `BUILD_EXAMPLES` settings.

## Installing the Dependencies from Source

The dependencies can also be installed from source. Simply clone the directories and run the following cmake and make instructions.

### libzmq

```bash
cmake -D WITH_PERF_TOOL=OFF -D ZMQ_BUILD_TESTS=OFF -D ENABLE_CPACK=OFF
-D CMAKE_BUILD_TYPE=Release
make
make install
```

### cppzmq

`cppzmq` is a header only library:

```bash
cmake -D CMAKE_BUILD_TYPE=Release
make install
```

### rapidjson

`rapidjson` is a header only library too, but requires some options to be set:

```bash
cmake -D RAPIDJSON_BUILD_DOC=OFF -D RAPIDJSON_BUILD_TESTS=OFF
-D RAPIDJSON_BUILD_EXAMPLES=OFF -D RAPIDJSON_HAS_STDSTRING=ON
-D CMAKE_BUILD_TYPE=Release
make install
```

### cryptopp

`cryptopp` must be built as a static library. Building cryptopp as a shared library is not supported on Windows.

```bash
cmake -D BUILD_SHARED=OFF -D BUILD_TESTING=OFF -D CMAKE_BUILD_TYPE=Release
make
make install
```

## License

We use a shared copyright model that enables all contributors to maintain the
copyright on their contributions.

This software is licensed under the BSD-3-Clause license. See the [LICENSE](LICENSE) file for details.
