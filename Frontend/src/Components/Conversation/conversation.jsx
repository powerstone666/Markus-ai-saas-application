import { Button, Switch, Box, Skeleton } from "@mui/material";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import {  useState } from "react";
import axios from "axios";
import Empty from "../empty";
import ReactMarkdown from "react-markdown";
import Heading from "../heading";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from "@mui/material";





const models= [
  {model:"Gemini-2.0-flash-thinking (Default)", image:"https://imgs.search.brave.com/z7fwA0qAHiZLXNtEDn-C_2xMweFLhC3FpzfLMRD2zdQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvZ2VtaW5pLWNv/bG9yLnBuZw"},
  { model: "AI21 Jamba 1.5 Large", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjE2IiBoZWlnaHQ9IjIxNiIgdmlld0JveD0iMCAwIDIxNiAyMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMTYiIGhlaWdodD0iMjE2IiBmaWxsPSJ3aGl0ZSIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNTgwXzI2KSI+CjxwYXRoIGQ9Ik00Ni43NDggMTE3Ljk0Nkw0NS41MTU1IDExNC4wNDlIMzQuMTQzOUwzMi45MTA5IDExNy45NDZIMjUuMDEzN0wzNi40Mjk4IDg1Ljg1NjRINDMuMjM0TDU0Ljc4NzEgMTE3Ljk0Nkg0Ni43NDhaTTM5Ljg1NDkgOTUuMDIzOEwzNS45Mjc2IDEwOC4yMjdINDMuNjkwOEwzOS44NTQ5IDk1LjAyMzhaIiBmaWxsPSIjMUYyMTI3Ii8+CjxwYXRoIGQ9Ik01NS42NjggODUuODU2NEg2My4xNTY4VjExNy45NDZINTUuNjY4Vjg1Ljg1NjRaIiBmaWxsPSIjMUYyMTI3Ii8+CjxwYXRoIGQ9Ik02NS4xNzQ5IDExMS4zOUM2NS41MTExIDEwOS44MDYgNjYuMTA1MSAxMDguMjg4IDY2LjkzMjkgMTA2Ljg5N0M2Ny42NTI4IDEwNS43MjIgNjguNTU0NyAxMDQuNjcgNjkuNjA0NSAxMDMuNzhDNzAuNjc2OSAxMDIuODg3IDcxLjgxNCAxMDIuMDc1IDczLjAwNjMgMTAxLjM1MUM3My45NDk2IDEwMC44IDc0LjgyNDggMTAwLjI3MyA3NS42MzE5IDk5Ljc2ODlDNzYuMzc2NCA5OS4zMTAxIDc3LjA4NjEgOTguNzk2OCA3Ny43NTUzIDk4LjIzMzJDNzguMzMzMyA5Ny43NTEgNzguODIwNSA5Ny4xNjg3IDc5LjE5MzkgOTYuNTEzOUM3OS41NTA0IDk1Ljg2MTIgNzkuNzMxNCA5NS4xMjY1IDc5LjcxOSA5NC4zODIyQzc5LjcxOSA5My4wOTg3IDc5LjM2ODkgOTIuMTc0MSA3OC42Njg5IDkxLjYwODdDNzcuOTI2NSA5MS4wMjk0IDc3LjAwNTcgOTAuNzI5MyA3Ni4wNjYgOTAuNzYwNEM3NC45OTY2IDkwLjcyOCA3My45NTY2IDkxLjExNDQgNzMuMTY2IDkxLjgzOEM3Mi4zODk4IDkyLjU1NjMgNzIuMDAxNyA5My43NTYgNzIuMDAxNyA5NS40MzY5SDY0LjY0OTRDNjQuNjM2MiA5NC4wNDA1IDY0Ljg5MjMgOTIuNjU0OCA2NS40MDMzIDkxLjM1NkM2NS44OTMzIDkwLjEyMDQgNjYuNjQ5NSA4OS4wMDg5IDY3LjYxNzYgODguMTAxMUM2OC42NDg2IDg3LjE0OTggNjkuODYwMSA4Ni40MTcgNzEuMTc5NiA4NS45NDY1QzcyLjczNCA4NS40MDE0IDc0LjM3MjMgODUuMTM3NCA3Ni4wMTg2IDg1LjE2NjhDNzcuNDMxMyA4NS4xNjAyIDc4LjgzNzkgODUuMzUzMiA4MC4xOTcxIDg1Ljc0QzgxLjQ2MTMgODYuMDkyMyA4Mi42NDY5IDg2LjY4MzYgODMuNjkwMyA4Ny40ODIxQzg0LjcxNTYgODguMjg3MSA4NS41MzY5IDg5LjMyMzggODYuMDg3NiA5MC41MDc4Qzg2LjcwOTYgOTEuODgxIDg3LjAxNCA5My4zNzc4IDg2Ljk3NzkgOTQuODg2Qzg2Ljk5NDQgOTYuMTYxNyA4Ni42OTYzIDk3LjQyMTggODYuMTEwMyA5OC41NTM5Qzg1LjU0OSA5OS42MzA3IDg0LjgzMzcgMTAwLjYxOSA4My45ODcgMTAxLjQ4OEM4My4xNjAyIDEwMi4zMzUgODIuMjUgMTAzLjA5NSA4MS4yNzAzIDEwMy43NTdDODAuMjk1MSAxMDQuNDE1IDc5LjQxMjIgMTA0Ljk3MyA3OC42MjE1IDEwNS40MzFDNzcuNTI0NiAxMDYuMTY0IDc2LjYxODkgMTA2Ljc5OCA3NS45MDQ0IDEwNy4zMzRDNzUuMjkxMiAxMDcuNzc5IDc0LjcxODMgMTA4LjI3NyA3NC4xOTIzIDEwOC44MjNDNzMuNzk4NyAxMDkuMjI4IDczLjQ5NTEgMTA5LjcxMyA3My4zMDE1IDExMC4yNDVDNzMuMTI1MSAxMTAuNzkyIDczLjA0MDIgMTExLjM2NSA3My4wNTAzIDExMS45NEg4Ni43NVYxMTcuOTQ2SDY0LjU1ODRDNjQuNTE5MyAxMTUuNzQ1IDY0LjcyNiAxMTMuNTQ1IDY1LjE3NDkgMTExLjM5WiIgZmlsbD0iIzFGMjEyNyIvPgo8cGF0aCBkPSJNODguMTY1IDkxLjQ5MTlDODkuNDQ0NiA5MS41MTgxIDkwLjcyMzIgOTEuNDAyNyA5MS45Nzc3IDkxLjE0NzlDOTIuODE1NyA5MC45ODgyIDkzLjYwNTIgOTAuNjM1MSA5NC4yODQgOTAuMTE2NUM5NC44Mjg3IDg5LjY2MjggOTUuMjI2MSA4OS4wNTYyIDk1LjQyNTUgODguMzc0NEM5NS42NTM3IDg3LjU1NDEgOTUuNzYxMyA4Ni43MDQ2IDk1Ljc0NDggODUuODUzSDEwMi4yNzdWMTE3Ljk0Nkg5NC43NDMyVjk2LjcxOTdIODguMTY1VjkxLjQ5MTlaIiBmaWxsPSIjMUYyMTI3Ii8+CjxwYXRoIGQ9Ik0xMTAuNzUxIDg1Ljg1NjRIMTE3LjczN1YxMTcuOTQ2SDExMC43NTFWODUuODU2NFoiIGZpbGw9IiNFOTFFNjMiLz4KPHBhdGggZD0iTTE0My41MzMgOTUuODMxOVYxMTcuOTNIMTM2LjU0NlYxMTQuODExQzEzNi4yNiAxMTUuMzQ4IDEzNS44OSAxMTUuODM1IDEzNS40NSAxMTYuMjU1QzEzNC45OCAxMTYuNzA4IDEzNC40NSAxMTcuMDk0IDEzMy44NzUgMTE3LjQwMUMxMzMuMjU4IDExNy43MyAxMzIuNjA3IDExNy45OTEgMTMxLjkzNCAxMTguMTc4QzEzMS4yNTEgMTE4LjM3NCAxMzAuNTQ0IDExOC40NzUgMTI5LjgzMyAxMTguNDc2QzEyOC4zMzMgMTE4LjQ5MyAxMjYuODQ2IDExOC4xODkgMTI1LjQ3MyAxMTcuNTgyQzEyNC4xODYgMTE3LjAxNCAxMjMuMDI4IDExNi4xODcgMTIyLjA3MSAxMTUuMTUzQzEyMS4xMDMgMTE0LjA5IDEyMC4zNTggMTEyLjg0MyAxMTkuODc5IDExMS40ODVDMTE4Ljg0NCAxMDguNTAyIDExOC44NDQgMTA1LjI1NCAxMTkuODc5IDEwMi4yN0MxMjAuMzU4IDEwMC45MTMgMTIxLjEwMyA5OS42NjU4IDEyMi4wNzEgOTguNjAyNUMxMjMuMDI4IDk3LjU2ODggMTI0LjE4NiA5Ni43NDIyIDEyNS40NzMgOTYuMTczNUMxMjYuODQ3IDk1LjU2NzcgMTI4LjMzNCA5NS4yNjM2IDEyOS44MzQgOTUuMjgxNUMxMzAuNTQ1IDk1LjI4MzIgMTMxLjI1MiA5NS4zODM0IDEzMS45MzUgOTUuNTc5M0MxMzIuNjExIDk1Ljc2ODYgMTMzLjI2MyA5Ni4wMzggMTMzLjg3NiA5Ni4zODE5QzEzNC40NTMgOTYuNzA1MiAxMzQuOTgzIDk3LjEwNjEgMTM1LjQ1MSA5Ny41NzM2QzEzNS44NzkgOTcuOTk1IDEzNi4yNDggOTguNDczMSAxMzYuNTQ3IDk4Ljk5NDZWOTUuODMxOUgxNDMuNTMzWk0xMzEuMjk1IDExMi41MkMxMzIuMDM1IDExMi41MzEgMTMyLjc2OSAxMTIuMzc0IDEzMy40NDEgMTEyLjA2MkMxMzQuMDYzIDExMS43NjkgMTM0LjYyMyAxMTEuMzU2IDEzNS4wODYgMTEwLjg0N0MxMzUuNTU0IDExMC4zMjUgMTM1LjkxOCAxMDkuNzE4IDEzNi4xNTkgMTA5LjA1OUMxMzYuNDE5IDEwOC4zNjMgMTM2LjU1IDEwNy42MjUgMTM2LjU0NyAxMDYuODgxQzEzNi41NTcgMTA1LjQzMiAxMzYuMDM3IDEwNC4wMjkgMTM1LjA4NSAxMDIuOTM4QzEzNC42MjcgMTAyLjQxOCAxMzQuMDY3IDEwMS45OTYgMTMzLjQ0IDEwMS43MDFDMTMyLjc2NSAxMDEuMzk5IDEzMi4wMzMgMTAxLjI0MiAxMzEuMjk0IDEwMS4yNDJDMTMwLjU1NCAxMDEuMjQyIDEyOS44MjMgMTAxLjM5OSAxMjkuMTQ4IDEwMS43MDFDMTI4LjUyMSAxMDEuOTk3IDEyNy45NjEgMTAyLjQxOCAxMjcuNTAzIDEwMi45MzhDMTI2LjU1MSAxMDQuMDI5IDEyNi4wMzEgMTA1LjQzMiAxMjYuMDQyIDEwNi44ODFDMTI2LjAzNyAxMDcuNjI1IDEyNi4xNjkgMTA4LjM2MyAxMjYuNDI5IDEwOS4wNTlDMTI2LjY3IDEwOS43MTggMTI3LjAzNCAxMTAuMzI1IDEyNy41MDIgMTEwLjg0N0MxMjcuOTY1IDExMS4zNTYgMTI4LjUyNCAxMTEuNzY5IDEyOS4xNDcgMTEyLjA2MkMxMjkuODE5IDExMi4zNzUgMTMwLjU1NCAxMTIuNTMxIDEzMS4yOTUgMTEyLjUyWiIgZmlsbD0iI0U5MUU2MyIvPgo8cGF0aCBkPSJNMTUyLjAyMiAxMTcuOTQ2SDE0NS4wMzVWODUuODU2NEgxNTIuMDIyVjk5LjAxMThDMTUyLjMyMSA5OC40OTAzIDE1Mi42OSA5OC4wMTIyIDE1My4xMTggOTcuNTkwOEMxNTMuNTkxIDk3LjExOTQgMTU0LjEyOSA5Ni43MTgyIDE1NC43MTUgOTYuMzk5MUMxNTUuMzMxIDk2LjA2MDMgMTU1Ljk4MSA5NS43OTExIDE1Ni42NTYgOTUuNTk2NUMxNTcuMzQ2IDk1LjM5NzQgMTU4LjA2MSA5NS4yOTcyIDE1OC43NzkgOTUuMjk4N0MxNjAuMjggOTUuMjgxNiAxNjEuNzY3IDk1LjU4NjQgMTYzLjE0IDk2LjE5MjZDMTY0LjQyNyA5Ni43NjE1IDE2NS41ODUgOTcuNTg4MSAxNjYuNTQyIDk4LjYyMTdDMTY3LjUwOSA5OS42ODUyIDE2OC4yNTUgMTAwLjkzMiAxNjguNzM0IDEwMi4yOUMxNjkuNzY5IDEwNS4yNzMgMTY5Ljc2OSAxMDguNTIxIDE2OC43MzQgMTExLjUwNUMxNjguMjU1IDExMi44NjIgMTY3LjUwOSAxMTQuMTA5IDE2Ni41NDIgMTE1LjE3MkMxNjUuNTg1IDExNi4yMDYgMTY0LjQyNyAxMTcuMDMzIDE2My4xNCAxMTcuNjAyQzE2MS43NjcgMTE4LjIwOCAxNjAuMjggMTE4LjUxMyAxNTguNzc5IDExOC40OTVDMTU4LjA2MSAxMTguNDk3IDE1Ny4zNDYgMTE4LjM5NyAxNTYuNjU2IDExOC4xOThDMTU1Ljk4NSAxMTguMDA1IDE1NS4zMzQgMTE3Ljc0NSAxNTQuNzE1IDExNy40MkMxNTQuMTMxIDExNy4xMTcgMTUzLjU5MyAxMTYuNzMxIDE1My4xMTggMTE2LjI3NEMxNTIuNjc5IDExNS44NTUgMTUyLjMwOSAxMTUuMzY3IDE1Mi4wMjIgMTE0LjgzVjExNy45NDZaTTE1Ny4zMTkgMTEyLjUzNkMxNTguMDQ1IDExMi41NDUgMTU4Ljc2MyAxMTIuMzg4IDE1OS40MiAxMTIuMDc4QzE2MC4wNDMgMTExLjc4NiAxNjAuNjAyIDExMS4zNzMgMTYxLjA2NSAxMTAuODY0QzE2MS41MzMgMTEwLjM0MSAxNjEuODk3IDEwOS43MzUgMTYyLjEzOSAxMDkuMDc1QzE2Mi4zOTggMTA4LjM3OSAxNjIuNTMgMTA3LjY0MSAxNjIuNTI2IDEwNi44OThDMTYyLjUzNiAxMDUuNDQ4IDE2Mi4wMTYgMTA0LjA0NSAxNjEuMDY0IDEwMi45NTVDMTYwLjYwNiAxMDIuNDM0IDE2MC4wNDYgMTAyLjAxMyAxNTkuNDE5IDEwMS43MTdDMTU4Ljc2MyAxMDEuNDA3IDE1OC4wNDUgMTAxLjI1IDE1Ny4zMTkgMTAxLjI1N0MxNTYuNTcyIDEwMS4yNDggMTU1LjgzMSAxMDEuNDA0IDE1NS4xNTEgMTAxLjcxNUMxNTQuNTE1IDEwMi4wMDYgMTUzLjk0OCAxMDIuNDI4IDE1My40ODQgMTAyLjk1M0MxNTIuNTMyIDEwNC4wNDMgMTUyLjAxMiAxMDUuNDQ2IDE1Mi4wMjMgMTA2Ljg5NkMxNTIuMDE5IDEwNy42MzkgMTUyLjE1IDEwOC4zNzcgMTUyLjQxIDEwOS4wNzNDMTUyLjY1MSAxMDkuNzMyIDE1My4wMTUgMTEwLjMzOSAxNTMuNDgzIDExMC44NjFDMTUzLjk1MiAxMTEuMzc1IDE1NC41MTggMTExLjc4OCAxNTUuMTUgMTEyLjA3NkMxNTUuODMgMTEyLjM4OCAxNTYuNTcxIDExMi41NDYgMTU3LjMxOSAxMTIuNTM2WiIgZmlsbD0iI0U5MUU2MyIvPgo8cGF0aCBkPSJNMTgyLjYzOCAxMDQuOTI2QzE4My42MTIgMTA1LjIwMSAxODQuNTI1IDEwNS40OTkgMTg1LjM3OCAxMDUuODJDMTg2LjE3NSAxMDYuMTExIDE4Ni45MjggMTA2LjUxMyAxODcuNjE1IDEwNy4wMTJDMTg4LjI0OSAxMDcuNDggMTg4Ljc3MSAxMDguMDgyIDE4OS4xNDUgMTA4Ljc3N0MxODkuNTUzIDEwOS42MDIgMTg5Ljc0OSAxMTAuNTE2IDE4OS43MTYgMTExLjQzNkMxODkuNzU0IDExMi41OTMgMTg5LjQ4NiAxMTMuNzQgMTg4LjkzOSAxMTQuNzZDMTg4LjQyIDExNS42NjMgMTg3LjY4MiAxMTYuNDIgMTg2Ljc5MyAxMTYuOTYxQzE4NS44MTUgMTE3LjU1MSAxODQuNzQxIDExNy45NjIgMTgzLjYyIDExOC4xNzVDMTgyLjM0OSAxMTguNDI2IDE4MS4wNTYgMTE4LjU0OCAxNzkuNzYxIDExOC41NDFDMTc2LjYyNSAxMTguNTQxIDE3NC4xNTIgMTE3Ljg1NCAxNzIuMzQxIDExNi40NzlDMTcwLjUyOSAxMTUuMTAzIDE2OS45ODkgMTEzLjEzMiAxNjkuOTg5IDExMC41NjRIMTc2LjQ3NEMxNzYuNDc0IDExMS43MjYgMTc2LjgwMSAxMTIuNTU5IDE3Ny40NTUgMTEzLjA2M0MxNzguMTkyIDExMy41OTMgMTc5LjA4NCAxMTMuODU5IDE3OS45OSAxMTMuODE5QzE4MC43MTMgMTEzLjg1IDE4MS40MzEgMTEzLjY4NCAxODIuMDY3IDExMy4zMzhDMTgyLjMzMyAxMTMuMTc0IDE4Mi41NDggMTEyLjkzOSAxODIuNjg5IDExMi42NkMxODIuODI5IDExMi4zODEgMTgyLjg5MSAxMTIuMDY4IDE4Mi44NjYgMTExLjc1N0MxODIuODg1IDExMS4zODIgMTgyLjc2MiAxMTEuMDE0IDE4Mi41MjQgMTEwLjcyNUMxODIuMjI1IDExMC40MTUgMTgxLjg2OCAxMTAuMTY1IDE4MS40NzQgMTA5Ljk5MkMxODAuODgzIDEwOS43MTcgMTgwLjI3MiAxMDkuNDg3IDE3OS42NDcgMTA5LjMwNEMxNzguOTAxIDEwOS4wNzQgMTc4LjAxIDEwOC43OTIgMTc2Ljk3NiAxMDguNDU2QzE3Ni4wNjMgMTA4LjE4MSAxNzUuMTk1IDEwNy44ODMgMTc0LjM3MyAxMDcuNTYyQzE3My42MDIgMTA3LjI2OSAxNzIuODczIDEwNi44NzYgMTcyLjIwNCAxMDYuMzkzQzE3MS41ODEgMTA1LjkzNiAxNzEuMDczIDEwNS4zMzkgMTcwLjcyIDEwNC42NTFDMTcwLjMyNyAxMDMuODIxIDE3MC4xMzkgMTAyLjkwOSAxNzAuMTcyIDEwMS45OTFDMTcwLjE3MiA5OS42OTkxIDE3MS4wNDcgOTguMDAyOSAxNzIuNzk3IDk2LjkwMjdDMTc0LjU0OCA5NS44MDI1IDE3Ni45MTUgOTUuMjUxOSAxNzkuODk4IDk1LjI1MUMxODEuMzEyIDk1LjIyNzIgMTgyLjcyMSA5NS40MjA2IDE4NC4wNzcgOTUuODI0MkMxODUuMTYzIDk2LjE0MzcgMTg2LjE3MiA5Ni42ODE4IDE4Ny4wNDUgOTcuNDA1NkMxODcuODA0IDk4LjA1NTQgMTg4LjQwNSA5OC44NzEgMTg4LjgwMyA5OS43ODk5QzE4OS4yIDEwMC43MTYgMTg5LjQwMiAxMDEuNzE1IDE4OS4zOTcgMTAyLjcyNEgxODIuNTAxQzE4Mi41NSAxMDEuOTQ4IDE4Mi4yOTYgMTAxLjE4NCAxODEuNzk0IDEwMC41OTJDMTgxLjUwNCAxMDAuMzIxIDE4MS4xNjIgMTAwLjExNCAxODAuNzg4IDk5Ljk4NDJDMTgwLjQxNSA5OS44NTQgMTgwLjAxOCA5OS44MDM0IDE3OS42MjQgOTkuODM1NkMxNzguOTgyIDk5LjgxOTkgMTc4LjM0OSA5OS45ODY4IDE3Ny43OTggMTAwLjMxN0MxNzcuNTQ2IDEwMC40NzEgMTc3LjM0IDEwMC42OTEgMTc3LjIwMyAxMDAuOTUzQzE3Ny4wNjYgMTAxLjIxNiAxNzcuMDAzIDEwMS41MTEgMTc3LjAyMSAxMDEuODA3QzE3Ny4wMDkgMTAyLjE3MSAxNzcuMTQgMTAyLjUyNiAxNzcuMzg3IDEwMi43OTNDMTc3LjY5NSAxMDMuMDk3IDE3OC4wNiAxMDMuMzM4IDE3OC40NiAxMDMuNTA0QzE3OS4wMzIgMTAzLjc1NCAxNzkuNjE5IDEwMy45NjkgMTgwLjIxOCAxMDQuMTQ1QzE4MC45MTggMTA0LjM2MSAxODEuNzI1IDEwNC42MjEgMTgyLjYzOCAxMDQuOTI2WiIgZmlsbD0iI0U5MUU2MyIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzU4MF8yNiI+CjxyZWN0IHdpZHRoPSIxNjUiIGhlaWdodD0iMzMuNzQ0MSIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1IDg1KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=" },
  { model: "AI21 Jamba 1.5 Mini", image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjE2IiBoZWlnaHQ9IjIxNiIgdmlld0JveD0iMCAwIDIxNiAyMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMTYiIGhlaWdodD0iMjE2IiBmaWxsPSJ3aGl0ZSIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNTgwXzI2KSI+CjxwYXRoIGQ9Ik00Ni43NDggMTE3Ljk0Nkw0NS41MTU1IDExNC4wNDlIMzQuMTQzOUwzMi45MTA5IDExNy45NDZIMjUuMDEzN0wzNi40Mjk4IDg1Ljg1NjRINDMuMjM0TDU0Ljc4NzEgMTE3Ljk0Nkg0Ni43NDhaTTM5Ljg1NDkgOTUuMDIzOEwzNS45Mjc2IDEwOC4yMjdINDMuNjkwOEwzOS44NTQ5IDk1LjAyMzhaIiBmaWxsPSIjMUYyMTI3Ii8+CjxwYXRoIGQ9Ik01NS42NjggODUuODU2NEg2My4xNTY4VjExNy45NDZINTUuNjY4Vjg1Ljg1NjRaIiBmaWxsPSIjMUYyMTI3Ii8+CjxwYXRoIGQ9Ik02NS4xNzQ5IDExMS4zOUM2NS41MTExIDEwOS44MDYgNjYuMTA1MSAxMDguMjg4IDY2LjkzMjkgMTA2Ljg5N0M2Ny42NTI4IDEwNS43MjIgNjguNTU0NyAxMDQuNjcgNjkuNjA0NSAxMDMuNzhDNzAuNjc2OSAxMDIuODg3IDcxLjgxNCAxMDIuMDc1IDczLjAwNjMgMTAxLjM1MUM3My45NDk2IDEwMC44IDc0LjgyNDggMTAwLjI3MyA3NS42MzE5IDk5Ljc2ODlDNzYuMzc2NCA5OS4zMTAxIDc3LjA4NjEgOTguNzk2OCA3Ny43NTUzIDk4LjIzMzJDNzguMzMzMyA5Ny43NTEgNzguODIwNSA5Ny4xNjg3IDc5LjE5MzkgOTYuNTEzOUM3OS41NTA0IDk1Ljg2MTIgNzkuNzMxNCA5NS4xMjY1IDc5LjcxOSA5NC4zODIyQzc5LjcxOSA5My4wOTg3IDc5LjM2ODkgOTIuMTc0MSA3OC42Njg5IDkxLjYwODdDNzcuOTI2NSA5MS4wMjk0IDc3LjAwNTcgOTAuNzI5MyA3Ni4wNjYgOTAuNzYwNEM3NC45OTY2IDkwLjcyOCA3My45NTY2IDkxLjExNDQgNzMuMTY2IDkxLjgzOEM3Mi4zODk4IDkyLjU1NjMgNzIuMDAxNyA5My43NTYgNzIuMDAxNyA5NS40MzY5SDY0LjY0OTRDNjQuNjM2MiA5NC4wNDA1IDY0Ljg5MjMgOTIuNjU0OCA2NS40MDMzIDkxLjM1NkM2NS44OTMzIDkwLjEyMDQgNjYuNjQ5NSA4OS4wMDg5IDY3LjYxNzYgODguMTAxMUM2OC42NDg2IDg3LjE0OTggNjkuODYwMSA4Ni40MTcgNzEuMTc5NiA4NS45NDY1QzcyLjczNCA4NS40MDE0IDc0LjM3MjMgODUuMTM3NCA3Ni4wMTg2IDg1LjE2NjhDNzcuNDMxMyA4NS4xNjAyIDc4LjgzNzkgODUuMzUzMiA4MC4xOTcxIDg1Ljc0QzgxLjQ2MTMgODYuMDkyMyA4Mi42NDY5IDg2LjY4MzYgODMuNjkwMyA4Ny40ODIxQzg0LjcxNTYgODguMjg3MSA4NS41MzY5IDg5LjMyMzggODYuMDg3NiA5MC41MDc4Qzg2LjcwOTYgOTEuODgxIDg3LjAxNCA5My4zNzc4IDg2Ljk3NzkgOTQuODg2Qzg2Ljk5NDQgOTYuMTYxNyA4Ni42OTYzIDk3LjQyMTggODYuMTEwMyA5OC41NTM5Qzg1LjU0OSA5OS42MzA3IDg0LjgzMzcgMTAwLjYxOSA4My45ODcgMTAxLjQ4OEM4My4xNjAyIDEwMi4zMzUgODIuMjUgMTAzLjA5NSA4MS4yNzAzIDEwMy43NTdDODAuMjk1MSAxMDQuNDE1IDc5LjQxMjIgMTA0Ljk3MyA3OC42MjE1IDEwNS40MzFDNzcuNTI0NiAxMDYuMTY0IDc2LjYxODkgMTA2Ljc5OCA3NS45MDQ0IDEwNy4zMzRDNzUuMjkxMiAxMDcuNzc5IDc0LjcxODMgMTA4LjI3NyA3NC4xOTIzIDEwOC44MjNDNzMuNzk4NyAxMDkuMjI4IDczLjQ5NTEgMTA5LjcxMyA3My4zMDE1IDExMC4yNDVDNzMuMTI1MSAxMTAuNzkyIDczLjA0MDIgMTExLjM2NSA3My4wNTAzIDExMS45NEg4Ni43NVYxMTcuOTQ2SDY0LjU1ODRDNjQuNTE5MyAxMTUuNzQ1IDY0LjcyNiAxMTMuNTQ1IDY1LjE3NDkgMTExLjM5WiIgZmlsbD0iIzFGMjEyNyIvPgo8cGF0aCBkPSJNODguMTY1IDkxLjQ5MTlDODkuNDQ0NiA5MS41MTgxIDkwLjcyMzIgOTEuNDAyNyA5MS45Nzc3IDkxLjE0NzlDOTIuODE1NyA5MC45ODgyIDkzLjYwNTIgOTAuNjM1MSA5NC4yODQgOTAuMTE2NUM5NC44Mjg3IDg5LjY2MjggOTUuMjI2MSA4OS4wNTYyIDk1LjQyNTUgODguMzc0NEM5NS42NTM3IDg3LjU1NDEgOTUuNzYxMyA4Ni43MDQ2IDk1Ljc0NDggODUuODUzSDEwMi4yNzdWMTE3Ljk0Nkg5NC43NDMyVjk2LjcxOTdIODguMTY1VjkxLjQ5MTlaIiBmaWxsPSIjMUYyMTI3Ii8+CjxwYXRoIGQ9Ik0xMTAuNzUxIDg1Ljg1NjRIMTE3LjczN1YxMTcuOTQ2SDExMC43NTFWODUuODU2NFoiIGZpbGw9IiNFOTFFNjMiLz4KPHBhdGggZD0iTTE0My41MzMgOTUuODMxOVYxMTcuOTNIMTM2LjU0NlYxMTQuODExQzEzNi4yNiAxMTUuMzQ4IDEzNS44OSAxMTUuODM1IDEzNS40NSAxMTYuMjU1QzEzNC45OCAxMTYuNzA4IDEzNC40NSAxMTcuMDk0IDEzMy44NzUgMTE3LjQwMUMxMzMuMjU4IDExNy43MyAxMzIuNjA3IDExNy45OTEgMTMxLjkzNCAxMTguMTc4QzEzMS4yNTEgMTE4LjM3NCAxMzAuNTQ0IDExOC40NzUgMTI5LjgzMyAxMTguNDc2QzEyOC4zMzMgMTE4LjQ5MyAxMjYuODQ2IDExOC4xODkgMTI1LjQ3MyAxMTcuNTgyQzEyNC4xODYgMTE3LjAxNCAxMjMuMDI4IDExNi4xODcgMTIyLjA3MSAxMTUuMTUzQzEyMS4xMDMgMTE0LjA5IDEyMC4zNTggMTEyLjg0MyAxMTkuODc5IDExMS40ODVDMTE4Ljg0NCAxMDguNTAyIDExOC44NDQgMTA1LjI1NCAxMTkuODc5IDEwMi4yN0MxMjAuMzU4IDEwMC45MTMgMTIxLjEwMyA5OS42NjU4IDEyMi4wNzEgOTguNjAyNUMxMjMuMDI4IDk3LjU2ODggMTI0LjE4NiA5Ni43NDIyIDEyNS40NzMgOTYuMTczNUMxMjYuODQ3IDk1LjU2NzcgMTI4LjMzNCA5NS4yNjM2IDEyOS44MzQgOTUuMjgxNUMxMzAuNTQ1IDk1LjI4MzIgMTMxLjI1MiA5NS4zODM0IDEzMS45MzUgOTUuNTc5M0MxMzIuNjExIDk1Ljc2ODYgMTMzLjI2MyA5Ni4wMzggMTMzLjg3NiA5Ni4zODE5QzEzNC40NTMgOTYuNzA1MiAxMzQuOTgzIDk3LjEwNjEgMTM1LjQ1MSA5Ny41NzM2QzEzNS44NzkgOTcuOTk1IDEzNi4yNDggOTguNDczMSAxMzYuNTQ3IDk4Ljk5NDZWOTUuODMxOUgxNDMuNTMzWk0xMzEuMjk1IDExMi41MkMxMzIuMDM1IDExMi41MzEgMTMyLjc2OSAxMTIuMzc0IDEzMy40NDEgMTEyLjA2MkMxMzQuMDYzIDExMS43NjkgMTM0LjYyMyAxMTEuMzU2IDEzNS4wODYgMTEwLjg0N0MxMzUuNTU0IDExMC4zMjUgMTM1LjkxOCAxMDkuNzE4IDEzNi4xNTkgMTA5LjA1OUMxMzYuNDE5IDEwOC4zNjMgMTM2LjU1IDEwNy42MjUgMTM2LjU0NyAxMDYuODgxQzEzNi41NTcgMTA1LjQzMiAxMzYuMDM3IDEwNC4wMjkgMTM1LjA4NSAxMDIuOTM4QzEzNC42MjcgMTAyLjQxOCAxMzQuMDY3IDEwMS45OTYgMTMzLjQ0IDEwMS43MDFDMTMyLjc2NSAxMDEuMzk5IDEzMi4wMzMgMTAxLjI0MiAxMzEuMjk0IDEwMS4yNDJDMTMwLjU1NCAxMDEuMjQyIDEyOS44MjMgMTAxLjM5OSAxMjkuMTQ4IDEwMS43MDFDMTI4LjUyMSAxMDEuOTk3IDEyNy45NjEgMTAyLjQxOCAxMjcuNTAzIDEwMi45MzhDMTI2LjU1MSAxMDQuMDI5IDEyNi4wMzEgMTA1LjQzMiAxMjYuMDQyIDEwNi44ODFDMTI2LjAzNyAxMDcuNjI1IDEyNi4xNjkgMTA4LjM2MyAxMjYuNDI5IDEwOS4wNTlDMTI2LjY3IDEwOS43MTggMTI3LjAzNCAxMTAuMzI1IDEyNy41MDIgMTEwLjg0N0MxMjcuOTY1IDExMS4zNTYgMTI4LjUyNCAxMTEuNzY5IDEyOS4xNDcgMTEyLjA2MkMxMjkuODE5IDExMi4zNzUgMTMwLjU1NCAxMTIuNTMxIDEzMS4yOTUgMTEyLjUyWiIgZmlsbD0iI0U5MUU2MyIvPgo8cGF0aCBkPSJNMTUyLjAyMiAxMTcuOTQ2SDE0NS4wMzVWODUuODU2NEgxNTIuMDIyVjk5LjAxMThDMTUyLjMyMSA5OC40OTAzIDE1Mi42OSA5OC4wMTIyIDE1My4xMTggOTcuNTkwOEMxNTMuNTkxIDk3LjExOTQgMTU0LjEyOSA5Ni43MTgyIDE1NC43MTUgOTYuMzk5MUMxNTUuMzMxIDk2LjA2MDMgMTU1Ljk4MSA5NS43OTExIDE1Ni42NTYgOTUuNTk2NUMxNTcuMzQ2IDk1LjM5NzQgMTU4LjA2MSA5NS4yOTcyIDE1OC43NzkgOTUuMjk4N0MxNjAuMjggOTUuMjgxNiAxNjEuNzY3IDk1LjU4NjQgMTYzLjE0IDk2LjE5MjZDMTY0LjQyNyA5Ni43NjE1IDE2NS41ODUgOTcuNTg4MSAxNjYuNTQyIDk4LjYyMTdDMTY3LjUwOSA5OS42ODUyIDE2OC4yNTUgMTAwLjkzMiAxNjguNzM0IDEwMi4yOUMxNjkuNzY5IDEwNS4yNzMgMTY5Ljc2OSAxMDguNTIxIDE2OC43MzQgMTExLjUwNUMxNjguMjU1IDExMi44NjIgMTY3LjUwOSAxMTQuMTA5IDE2Ni41NDIgMTE1LjE3MkMxNjUuNTg1IDExNi4yMDYgMTY0LjQyNyAxMTcuMDMzIDE2My4xNCAxMTcuNjAyQzE2MS43NjcgMTE4LjIwOCAxNjAuMjggMTE4LjUxMyAxNTguNzc5IDExOC40OTVDMTU4LjA2MSAxMTguNDk3IDE1Ny4zNDYgMTE4LjM5NyAxNTYuNjU2IDExOC4xOThDMTU1Ljk4NSAxMTguMDA1IDE1NS4zMzQgMTE3Ljc0NSAxNTQuNzE1IDExNy40MkMxNTQuMTMxIDExNy4xMTcgMTUzLjU5MyAxMTYuNzMxIDE1My4xMTggMTE2LjI3NEMxNTIuNjc5IDExNS44NTUgMTUyLjMwOSAxMTUuMzY3IDE1Mi4wMjIgMTE0LjgzVjExNy45NDZaTTE1Ny4zMTkgMTEyLjUzNkMxNTguMDQ1IDExMi41NDUgMTU4Ljc2MyAxMTIuMzg4IDE1OS40MiAxMTIuMDc4QzE2MC4wNDMgMTExLjc4NiAxNjAuNjAyIDExMS4zNzMgMTYxLjA2NSAxMTAuODY0QzE2MS41MzMgMTEwLjM0MSAxNjEuODk3IDEwOS43MzUgMTYyLjEzOSAxMDkuMDc1QzE2Mi4zOTggMTA4LjM3OSAxNjIuNTMgMTA3LjY0MSAxNjIuNTI2IDEwNi44OThDMTYyLjUzNiAxMDUuNDQ4IDE2Mi4wMTYgMTA0LjA0NSAxNjEuMDY0IDEwMi45NTVDMTYwLjYwNiAxMDIuNDM0IDE2MC4wNDYgMTAyLjAxMyAxNTkuNDE5IDEwMS43MTdDMTU4Ljc2MyAxMDEuNDA3IDE1OC4wNDUgMTAxLjI1IDE1Ny4zMTkgMTAxLjI1N0MxNTYuNTcyIDEwMS4yNDggMTU1LjgzMSAxMDEuNDA0IDE1NS4xNTEgMTAxLjcxNUMxNTQuNTE1IDEwMi4wMDYgMTUzLjk0OCAxMDIuNDI4IDE1My40ODQgMTAyLjk1M0MxNTIuNTMyIDEwNC4wNDMgMTUyLjAxMiAxMDUuNDQ2IDE1Mi4wMjMgMTA2Ljg5NkMxNTIuMDE5IDEwNy42MzkgMTUyLjE1IDEwOC4zNzcgMTUyLjQxIDEwOS4wNzNDMTUyLjY1MSAxMDkuNzMyIDE1My4wMTUgMTEwLjMzOSAxNTMuNDgzIDExMC44NjFDMTUzLjk1MiAxMTEuMzc1IDE1NC41MTggMTExLjc4OCAxNTUuMTUgMTEyLjA3NkMxNTUuODMgMTEyLjM4OCAxNTYuNTcxIDExMi41NDYgMTU3LjMxOSAxMTIuNTM2WiIgZmlsbD0iI0U5MUU2MyIvPgo8cGF0aCBkPSJNMTgyLjYzOCAxMDQuOTI2QzE4My42MTIgMTA1LjIwMSAxODQuNTI1IDEwNS40OTkgMTg1LjM3OCAxMDUuODJDMTg2LjE3NSAxMDYuMTExIDE4Ni45MjggMTA2LjUxMyAxODcuNjE1IDEwNy4wMTJDMTg4LjI0OSAxMDcuNDggMTg4Ljc3MSAxMDguMDgyIDE4OS4xNDUgMTA4Ljc3N0MxODkuNTUzIDEwOS42MDIgMTg5Ljc0OSAxMTAuNTE2IDE4OS43MTYgMTExLjQzNkMxODkuNzU0IDExMi41OTMgMTg5LjQ4NiAxMTMuNzQgMTg4LjkzOSAxMTQuNzZDMTg4LjQyIDExNS42NjMgMTg3LjY4MiAxMTYuNDIgMTg2Ljc5MyAxMTYuOTYxQzE4NS44MTUgMTE3LjU1MSAxODQuNzQxIDExNy45NjIgMTgzLjYyIDExOC4xNzVDMTgyLjM0OSAxMTguNDI2IDE4MS4wNTYgMTE4LjU0OCAxNzkuNzYxIDExOC41NDFDMTc2LjYyNSAxMTguNTQxIDE3NC4xNTIgMTE3Ljg1NCAxNzIuMzQxIDExNi40NzlDMTcwLjUyOSAxMTUuMTAzIDE2OS45ODkgMTEzLjEzMiAxNjkuOTg5IDExMC41NjRIMTc2LjQ3NEMxNzYuNDc0IDExMS43MjYgMTc2LjgwMSAxMTIuNTU5IDE3Ny40NTUgMTEzLjA2M0MxNzguMTkyIDExMy41OTMgMTc5LjA4NCAxMTMuODU5IDE3OS45OSAxMTMuODE5QzE4MC43MTMgMTEzLjg1IDE4MS40MzEgMTEzLjY4NCAxODIuMDY3IDExMy4zMzhDMTgyLjMzMyAxMTMuMTc0IDE4Mi41NDggMTEyLjkzOSAxODIuNjg5IDExMi42NkMxODIuODI5IDExMi4zODEgMTgyLjg5MSAxMTIuMDY4IDE4Mi44NjYgMTExLjc1N0MxODIuODg1IDExMS4zODIgMTgyLjc2MiAxMTEuMDE0IDE4Mi41MjQgMTEwLjcyNUMxODIuMjI1IDExMC40MTUgMTgxLjg2OCAxMTAuMTY1IDE4MS40NzQgMTA5Ljk5MkMxODAuODgzIDEwOS43MTcgMTgwLjI3MiAxMDkuNDg3IDE3OS42NDcgMTA5LjMwNEMxNzguOTAxIDEwOS4wNzQgMTc4LjAxIDEwOC43OTIgMTc2Ljk3NiAxMDguNDU2QzE3Ni4wNjMgMTA4LjE4MSAxNzUuMTk1IDEwNy44ODMgMTc0LjM3MyAxMDcuNTYyQzE3My42MDIgMTA3LjI2OSAxNzIuODczIDEwNi44NzYgMTcyLjIwNCAxMDYuMzkzQzE3MS41ODEgMTA1LjkzNiAxNzEuMDczIDEwNS4zMzkgMTcwLjcyIDEwNC42NTFDMTcwLjMyNyAxMDMuODIxIDE3MC4xMzkgMTAyLjkwOSAxNzAuMTcyIDEwMS45OTFDMTcwLjE3MiA5OS42OTkxIDE3MS4wNDcgOTguMDAyOSAxNzIuNzk3IDk2LjkwMjdDMTc0LjU0OCA5NS44MDI1IDE3Ni45MTUgOTUuMjUxOSAxNzkuODk4IDk1LjI1MUMxODEuMzEyIDk1LjIyNzIgMTgyLjcyMSA5NS40MjA2IDE4NC4wNzcgOTUuODI0MkMxODUuMTYzIDk2LjE0MzcgMTg2LjE3MiA5Ni42ODE4IDE4Ny4wNDUgOTcuNDA1NkMxODcuODA0IDk4LjA1NTQgMTg4LjQwNSA5OC44NzEgMTg4LjgwMyA5OS43ODk5QzE4OS4yIDEwMC43MTYgMTg5LjQwMiAxMDEuNzE1IDE4OS4zOTcgMTAyLjcyNEgxODIuNTAxQzE4Mi41NSAxMDEuOTQ4IDE4Mi4yOTYgMTAxLjE4NCAxODEuNzk0IDEwMC41OTJDMTgxLjUwNCAxMDAuMzIxIDE4MS4xNjIgMTAwLjExNCAxODAuNzg4IDk5Ljk4NDJDMTgwLjQxNSA5OS44NTQgMTgwLjAxOCA5OS44MDM0IDE3OS42MjQgOTkuODM1NkMxNzguOTgyIDk5LjgxOTkgMTc4LjM0OSA5OS45ODY4IDE3Ny43OTggMTAwLjMxN0MxNzcuNTQ2IDEwMC40NzEgMTc3LjM0IDEwMC42OTEgMTc3LjIwMyAxMDAuOTUzQzE3Ny4wNjYgMTAxLjIxNiAxNzcuMDAzIDEwMS41MTEgMTc3LjAyMSAxMDEuODA3QzE3Ny4wMDkgMTAyLjE3MSAxNzcuMTQgMTAyLjUyNiAxNzcuMzg3IDEwMi43OTNDMTc3LjY5NSAxMDMuMDk3IDE3OC4wNiAxMDMuMzM4IDE3OC40NiAxMDMuNTA0QzE3OS4wMzIgMTAzLjc1NCAxNzkuNjE5IDEwMy45NjkgMTgwLjIxOCAxMDQuMTQ1QzE4MC45MTggMTA0LjM2MSAxODEuNzI1IDEwNC42MjEgMTgyLjYzOCAxMDQuOTI2WiIgZmlsbD0iI0U5MUU2MyIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzU4MF8yNiI+CjxyZWN0IHdpZHRoPSIxNjUiIGhlaWdodD0iMzMuNzQ0MSIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1IDg1KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=" },
  { model: "Cohere Command R", image: "https://imgs.search.brave.com/WEyS3QxIc3-YyJyEYSeIyTRkGS17x13tYpt-RyZG3Po/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvY29oZXJlLWNv/bG9yLnBuZw" },
  { model: "Cohere Command R 08-2024", image: "https://imgs.search.brave.com/WEyS3QxIc3-YyJyEYSeIyTRkGS17x13tYpt-RyZG3Po/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvY29oZXJlLWNv/bG9yLnBuZw" },
  { model: "Cohere Command R+", image: "https://imgs.search.brave.com/WEyS3QxIc3-YyJyEYSeIyTRkGS17x13tYpt-RyZG3Po/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvY29oZXJlLWNv/bG9yLnBuZw" },
  { model: "Cohere Command R+ 08-2024", image: "https://imgs.search.brave.com/WEyS3QxIc3-YyJyEYSeIyTRkGS17x13tYpt-RyZG3Po/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvY29oZXJlLWNv/bG9yLnBuZw" },
  {model:"DeepSeek R1",image:"https://imgs.search.brave.com/z3-PbhQvXB5EmwImGTfsivcaoaRQRPIDDY6KwUGRLU4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2xp/Z2h0L2RlZXBzZWVr/LWNvbG9yLnBuZw"},
  {model:"Gemini-2.0-Flash", image:"https://imgs.search.brave.com/z7fwA0qAHiZLXNtEDn-C_2xMweFLhC3FpzfLMRD2zdQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvZ2VtaW5pLWNv/bG9yLnBuZw"},
  { model: "JAIS-30B-Chat-Arabic", image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiPgo8cGF0aCBkPSJNMCAwIEM4NC40OCAwIDE2OC45NiAwIDI1NiAwIEMyNTYgODQuNDggMjU2IDE2OC45NiAyNTYgMjU2IEMxNzEuNTIgMjU2IDg3LjA0IDI1NiAwIDI1NiBDMCAxNzEuNTIgMCA4Ny4wNCAwIDAgWiAiIGZpbGw9IiNGRUZFRkUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsMCkiLz4KPHBhdGggZD0iTTAgMCBDMzkuNiAwIDc5LjIgMCAxMjAgMCBDMTIwLjEyMzc1IDE1LjEzODc1IDEyMC4yNDc1IDMwLjI3NzUgMTIwLjM3NSA0NS44NzUgQzEyMC40NTY5MzYwNCA1Mi45OTAzODMzIDEyMC40NTY5MzYwNCA1Mi45OTAzODMzIDEyMC41NDA1MjczNCA2MC4yNDk1MTE3MiBDMTIwLjU2NzYyNjk1IDY2LjEzNTAwOTc3IDEyMC41Njc2MjY5NSA2Ni4xMzUwMDk3NyAxMjAuNTcyNjYyMzUgNjguOTA4MjMzNjQgQzEyMC41ODE3NTE5MSA3MC44MDU4NjIzOCAxMjAuNjAyNTkwMjIgNzIuNzAzNDYxMDggMTIwLjYzMzQ1MzM3IDc0LjYwMDg2MDYgQzEyMS4wMzAwOTE3NyAxMDAuMzE3NDQ3MzggMTEyLjUzMzQ5MTQ3IDEyMS43MTQ4Mzk5OSA5NC44MTI1IDE0MC42ODc1IEM3OC41MTAxNzg0OCAxNTYuMjI5NjA5NjMgNTguOTY0OTc1MiAxNjEuNDcwMDkxMTcgMzYuOTQ1MzEyNSAxNjEuMjA3MDMxMjUgQzE3LjgwMzkyMTY2IDE2MC43MTI1NzA2IDEuNDk2Njk0NTYgMTU0LjM3Nzk0NjkgLTEzIDE0MiBDLTEzLjY1MjI2NTYyIDE0MS40NTk4ODI4MSAtMTQuMzA0NTMxMjUgMTQwLjkxOTc2NTYyIC0xNC45NzY1NjI1IDE0MC4zNjMyODEyNSBDLTI2LjI1ODQwNjU2IDEzMC4xMzc1MDAyMiAtMzIuODU4MjQyMzYgMTE0Ljc4NjMyNDE5IC0zNi44MTI1IDEwMC40Mzc1IEMtMzcuMDMxOTYyODkgOTkuNjU4MDIwMDIgLTM3LjI1MTQyNTc4IDk4Ljg3ODU0MDA0IC0zNy40Nzc1MzkwNiA5OC4wNzU0Mzk0NSBDLTM5LjA2MjMzNzMgOTEuOTY4NTg5NjkgLTM5IDg3LjY0ODk2NTkzIC0zOSA4MSBDLTI1LjggODEgLTEyLjYgODEgMSA4MSBDMS42NiA4My42NCAyLjMyIDg2LjI4IDMgODkgQzYuODY5NDk4NzcgMTAwLjcyODQ4MDc4IDEyLjYxMTA1NTA3IDEwOS42OTg2OTMzNSAyMy41MDc4MTI1IDExNS44NDM3NSBDMzAuMDcxMDIzNjEgMTE4Ljg4ODc1MDc3IDM1LjY2MzU2NDY2IDExOS4zNjUzODQ3NSA0Mi44MTI1IDExOS4zNzUgQzQ0LjIzMjcyNDYxIDExOS40MTE3MzgyOCA0NC4yMzI3MjQ2MSAxMTkuNDExNzM4MjggNDUuNjgxNjQwNjIgMTE5LjQ0OTIxODc1IEM1NS4xNzAzODU0OCAxMTkuNDg4NDAxNDUgNjMuNjgwNDIwNzUgMTE2LjIxMjkyMTAyIDcwLjU1ODU5Mzc1IDEwOS40NzI2NTYyNSBDNzYuNjIxMjM4MTkgMTAyLjgwNTI1OTI1IDgwLjA1NDYxMjkyIDk1LjcyMzIyNDczIDgwLjIwNTMyMjI3IDg2LjY4MDY2NDA2IEM4MC4yMjU1MDQxNSA4NS42MDUxMDI1NCA4MC4yNDU2ODYwNCA4NC41Mjk1NDEwMiA4MC4yNjY0Nzk0OSA4My40MjEzODY3MiBDODAuMjgyOTU1MzIgODIuMjk3NDg1MzUgODAuMjk5NDMxMTUgODEuMTczNTgzOTggODAuMzE2NDA2MjUgODAuMDE1NjI1IEM4MC4zMzUwNTczNyA3OC45Nzc3Njg1NSA4MC4zNTM3MDg1IDc3LjkzOTkxMjExIDgwLjM3MjkyNDggNzYuODcwNjA1NDcgQzgwLjQ0MTE3NTA2IDcyLjk5NzE1NjE0IDgwLjUwMTM1NDA0IDY5LjEyMzU2Nzk5IDgwLjU2MjUgNjUuMjUgQzgwLjcwNjg3NSA1Ni41ODc1IDgwLjg1MTI1IDQ3LjkyNSA4MSAzOSBDNTQuMjcgMzkgMjcuNTQgMzkgMCAzOSBDMCAyNi4xMyAwIDEzLjI2IDAgMCBaICIgZmlsbD0iIzY0NUZGMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjgsNjcpIi8+CjxwYXRoIGQ9Ik0wIDAgQzEyLjU0IDAgMjUuMDggMCAzOCAwIEMzOCAxMi44NyAzOCAyNS43NCAzOCAzOSBDMjUuNDYgMzkgMTIuOTIgMzkgMCAzOSBDMCAyNi4xMyAwIDEzLjI2IDAgMCBaICIgZmlsbD0iIzA4MDg0MiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg5LDI4KSIvPgo8L3N2Zz4K" },
  { model: "Llama-3.3-70B-Instruct", image: "https://imgs.search.brave.com/AgIzAEXNPptCf7ZQviNhH8txyjoU1UpbiNVfQ7av458/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvbWV0YS1jb2xv/ci5wbmc" },
  { model: "Meta-Llama-3-70B-Instruct", image: "https://imgs.search.brave.com/AgIzAEXNPptCf7ZQviNhH8txyjoU1UpbiNVfQ7av458/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvbWV0YS1jb2xv/ci5wbmc" },
  { model: "Meta-Llama-3-8B-Instruct", image: "https://imgs.search.brave.com/AgIzAEXNPptCf7ZQviNhH8txyjoU1UpbiNVfQ7av458/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvbWV0YS1jb2xv/ci5wbmc" },
  { model: "Meta-Llama-3.1-405B-Instruct", image: "https://imgs.search.brave.com/AgIzAEXNPptCf7ZQviNhH8txyjoU1UpbiNVfQ7av458/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvbWV0YS1jb2xv/ci5wbmc" },
  { model: "Meta-Llama-3.1-70B-Instruct", image: "https://imgs.search.brave.com/AgIzAEXNPptCf7ZQviNhH8txyjoU1UpbiNVfQ7av458/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvbWV0YS1jb2xv/ci5wbmc" },
  { model: "Meta-Llama-3.1-8B-Instruct", image: "https://imgs.search.brave.com/AgIzAEXNPptCf7ZQviNhH8txyjoU1UpbiNVfQ7av458/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZWdp/c3RyeS5ucG1taXJy/b3IuY29tL0Bsb2Jl/aHViL2ljb25zLXN0/YXRpYy1wbmcvbGF0/ZXN0L2ZpbGVzL2Rh/cmsvbWV0YS1jb2xv/ci5wbmc" },
  { model: "Ministral 3B", image: "https://imgs.search.brave.com/GR1WBKr5vzyNdbTyWBmSZIMVVhBzyrq12gfGlZ2pbDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL00vbWlzdHJh/bC1haS1pY29uLWxv/Z28tQjMzMTlEQ0E2/Qi1zZWVrbG9nby5j/b20ucG5n" },
  { model: "Mistral Large", image: "https://imgs.search.brave.com/GR1WBKr5vzyNdbTyWBmSZIMVVhBzyrq12gfGlZ2pbDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL00vbWlzdHJh/bC1haS1pY29uLWxv/Z28tQjMzMTlEQ0E2/Qi1zZWVrbG9nby5j/b20ucG5n" },
  { model: "Mistral Large (2407)", image: "https://imgs.search.brave.com/GR1WBKr5vzyNdbTyWBmSZIMVVhBzyrq12gfGlZ2pbDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL00vbWlzdHJh/bC1haS1pY29uLWxv/Z28tQjMzMTlEQ0E2/Qi1zZWVrbG9nby5j/b20ucG5n" },
  { model: "Mistral Large 24.11", image: "https://imgs.search.brave.com/GR1WBKr5vzyNdbTyWBmSZIMVVhBzyrq12gfGlZ2pbDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL00vbWlzdHJh/bC1haS1pY29uLWxv/Z28tQjMzMTlEQ0E2/Qi1zZWVrbG9nby5j/b20ucG5n" },
  { model: "Mistral Nemo", image: "https://imgs.search.brave.com/GR1WBKr5vzyNdbTyWBmSZIMVVhBzyrq12gfGlZ2pbDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL00vbWlzdHJh/bC1haS1pY29uLWxv/Z28tQjMzMTlEQ0E2/Qi1zZWVrbG9nby5j/b20ucG5n" },
  { model: "Mistral Small", image: "https://imgs.search.brave.com/GR1WBKr5vzyNdbTyWBmSZIMVVhBzyrq12gfGlZ2pbDE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL00vbWlzdHJh/bC1haS1pY29uLWxv/Z28tQjMzMTlEQ0E2/Qi1zZWVrbG9nby5j/b20ucG5n" },
  { model: "OpenAI GPT-4o", image: "https://imgs.search.brave.com/9PBi2NcBiaalees61bHjy8n1aHIWQPbWrE-M-FzYAlE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzNi/OXU1L3N0eWxlcy9j/b21tdW5pdHlJY29u/X2Q0OWE3dmlieTNk/YjEucG5n" },
  { model: "OpenAI GPT-4o mini", image: "https://imgs.search.brave.com/9PBi2NcBiaalees61bHjy8n1aHIWQPbWrE-M-FzYAlE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzNi/OXU1L3N0eWxlcy9j/b21tdW5pdHlJY29u/X2Q0OWE3dmlieTNk/YjEucG5n" },
  { model: "OpenAI o1", image: "https://imgs.search.brave.com/9PBi2NcBiaalees61bHjy8n1aHIWQPbWrE-M-FzYAlE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzNi/OXU1L3N0eWxlcy9j/b21tdW5pdHlJY29u/X2Q0OWE3dmlieTNk/YjEucG5n" },
  { model: "OpenAI o1-mini", image: "https://imgs.search.brave.com/9PBi2NcBiaalees61bHjy8n1aHIWQPbWrE-M-FzYAlE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzNi/OXU1L3N0eWxlcy9j/b21tdW5pdHlJY29u/X2Q0OWE3dmlieTNk/YjEucG5n" },
  { model: "OpenAI o1-preview", image: "https://imgs.search.brave.com/9PBi2NcBiaalees61bHjy8n1aHIWQPbWrE-M-FzYAlE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzNi/OXU1L3N0eWxlcy9j/b21tdW5pdHlJY29u/X2Q0OWE3dmlieTNk/YjEucG5n" },
  { model: "Phi-3-mini instruct (128k)", image: "https://imgs.search.brave.com/lZtSHU0xcSaZfNN6zHo9A4aLmiNBnFIEpmjesp6VYeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc" },
  { model: "Phi-3-mini instruct (4k)", image: "https://imgs.search.brave.com/lZtSHU0xcSaZfNN6zHo9A4aLmiNBnFIEpmjesp6VYeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc" },
  { model: "Phi-3-medium instruct (128k)", image: "https://imgs.search.brave.com/lZtSHU0xcSaZfNN6zHo9A4aLmiNBnFIEpmjesp6VYeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc" },
  { model: "Phi-3-medium instruct (4k)", image: "https://imgs.search.brave.com/lZtSHU0xcSaZfNN6zHo9A4aLmiNBnFIEpmjesp6VYeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc" },
  { model: "Phi-3-small instruct (128k)", image: "https://imgs.search.brave.com/lZtSHU0xcSaZfNN6zHo9A4aLmiNBnFIEpmjesp6VYeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc" },
  { model: "Phi-3-small instruct (8k)", image: "https://imgs.search.brave.com/lZtSHU0xcSaZfNN6zHo9A4aLmiNBnFIEpmjesp6VYeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc" },
  { model: "Phi-3.5-MoE instruct (128k)", image: "https://imgs.search.brave.com/lZtSHU0xcSaZfNN6zHo9A4aLmiNBnFIEpmjesp6VYeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc" },
  { model: "Phi-3.5-mini instruct (128k)", image: "https://imgs.search.brave.com/lZtSHU0xcSaZfNN6zHo9A4aLmiNBnFIEpmjesp6VYeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc" },
  { model: "Phi-4", image: "https://imgs.search.brave.com/lZtSHU0xcSaZfNN6zHo9A4aLmiNBnFIEpmjesp6VYeA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc" }
];



function Conversation() {

    const [error, setError] = useState("");
  const [selectedModel, setSelectedModel] = useState("Gemini-2.0-flash-thinking (Default)");
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const userMessage = {
      role: "user",
      content: message,
    };


    const newMessages = [...conversation, userMessage];
    setConversation(newMessages);

    try {
      const url="https://markus-ai-saas-application.vercel.app"
        //const url="http://localhost:3000"
      const res = await axios.post(`${url}/api/v1/conversation`, {
        message: newMessages,
        model: selectedModel,
      });
  
      const apiMessage = {
        role: "ai",
        content: res.data.message,
      };
        
      setConversation((current) => [...current, apiMessage]);
      setMessage("");
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching results.");
      console.log(err);
      setLoading(false); 
    }
  };


  const handleChange = () => {
    const newState = !checked;
    setChecked(newState);
    
    // Reset to default only when toggling OFF
    if (!newState) {
      setSelectedModel("Gemini-2.0-flash-thinking (Default)");
    }
  };

  return (
    <div >
      <Heading
        title="Conversation"
        description="Chat with the smartest AI - Experience the power of AI"
        icon={<SmsOutlinedIcon color="secondary" fontSize="large" />}
        iconColor="purple"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <form
          className="rounded-lg border w-full p-4 px-3 md:px-8 focus-within:shadow-sm grid grid-cols-12 gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Type a message"
            className="col-span-10 focus:outline-none"
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full col-span-12 lg:col-span-2 text-white"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "black", 
              color: "white", 
              "&:hover": {
                backgroundColor: "black/10", 
              },
            }}
          >
            Generate
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        <p className="text-gray-400 text-center mt-4">If this model is temporarily busy, you can instantly switch to another one below — your request will keep flowing smoothly! 🚀</p>
        <div className="space-y-4 mt-4">
          <h1>Additional Parameters</h1>
          <div className="flex space-x-4">
            <Switch onClick={handleChange} />
            <div className="border-2 border-purple-800 p-2 rounded-md">
              <p className="text-purple-700">PRO</p>
            </div>
          </div>
          {checked ? 
          <>
       <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">AI Models</InputLabel>
  <Select
  value={selectedModel}
  onChange={(e) => setSelectedModel(e.target.value)}
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="AI Models"
  className="w-full"
>
  {models.map((modelInfo, index) => (
    <MenuItem key={index} value={modelInfo.model} className="flex items-center">
      {/* Wrapper for image and text */}
      <div className="flex items-center">
        <img
          src={modelInfo.image}
          alt={modelInfo.model}
          className="w-8 mr-2 object-contain"
        />
        <span>{modelInfo.model}</span>
      </div>
    </MenuItem>
  ))}
</Select>

 
</FormControl>
          </>: 
          <>
          <h1>Experiment with different models</h1>
          </>
          }
        </div>

        {/* Conversation */}
        <div className="space-y-4 mt-4">
          {loading && (
            <div className="flex flex-col-reverse gap-y-4">
              <div className="p-8 w-full flex items-start gap-x-8 rounded-lg bg-purple-200">
                <span className="text-purple-500">AI: </span>

                <Box sx={{ width: "100%" }}>
                  <Skeleton variant="rectangular" height={80} />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation={false} />
                </Box>
              </div>
            </div>
          )}

          {conversation.length === 0 && !loading && (
            <Empty label="No Conversation Started" />
          )}

          {/* Show Skeleton when loading AI response */}

          <div className="flex flex-col-reverse gap-y-4">
            {conversation.map((mes, index) => (
              <div
                key={index}
                className={`p-8 w-full flex items-start gap-x-8 rounded-lg ${
                  mes.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-purple-50"
                }`}
              >
                <span
                  className={
                    mes.role === "user" ? "text-blue-500" : "text-purple-500"
                  }
                >
                  {mes.role === "user" ? "You: " : "AI: "}
                </span>
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full mt-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {mes.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
