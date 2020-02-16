<template>
    <div id="wave">
        <div class="water">
            <div class="water-2"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "wave"
    }
</script>

<style lang="scss" scoped>
    #wave {
        background: linear-gradient(to right, #ff0000 , #ff4671);
        width: 100%;
        position: absolute;
        .water {
            position: absolute;
            left: 0;
            bottom: -10px;
            height: 60px;
            width: 100%;
            .water-2 {
                position: absolute;
                width: 100%;
                height: 80px;
                top: 5px;
                background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSI2MDBweCIgaGVpZ2h0PSI2MHB4IiB2aWV3Qm94PSIwIDAgNjAwIDYwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNCAoMTU1NzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICAgIDx0aXRsZT53YXRlci0yPC90aXRsZT4NCiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IuaIkSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+DQogICAgICAgIDxnIGlkPSItIiBza2V0Y2g6dHlwZT0iTVNBcnRib2FyZEdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTIxLjAwMDAwMCwgLTI0Ni4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4NCiAgICAgICAgICAgIDxnIGlkPSJ3YXRlci0yIiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjEuMDAwMDAwLCAyNDYuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsNy42OTg1NzM5NSBMNC42NzA3MTk2MmUtMTUsNjAgTDYwMCw2MCBMNjAwLDcuMzUyMzA0NjEgQzYwMCw3LjM1MjMwNDYxIDQzMi43MjEwNTIsMjQuMTA2NTEzOCAyOTAuNDg0MDQsNy4zNTY3NDE4NyBDMTQ4LjI0NzAyNywtOS4zOTMwMzAwOCAwLDcuNjk4NTczOTUgMCw3LjY5ODU3Mzk1IFoiIGlkPSJQYXRoLTIiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwMC4wMDAwMDAsIDMwLjAwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMzAwLjAwMDAwMCwgLTMwLjAwMDAwMCkgIj48L3BhdGg+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4=) repeat-x;
                background-size: 600px;
                animation: wave-animation-2 6s infinite linear;
            }
            @keyframes wave-animation-2 {
                0% {
                    background-position: 0 top
                }
                100% {
                    background-position: 600px top
                }
            }
        }
    }




</style>