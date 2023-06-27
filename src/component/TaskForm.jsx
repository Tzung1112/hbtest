
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { randomId } from "@mieuteacher/meomeojs";
import { Link } from "react-router-dom";
function App() {
    const [tasks, setTasks] = useState(null);
    const [task, setTask] = useState(null);
    const [time, setTime] = useState(null);
    const [isAdd, setIsAdd] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [isReminder, setIsReminder] = useState(false);

    const handleChangeTask = (event) => {
        if (event.target.value !== "") {
            setTask(event.target.value);
        } else {
            return;
        }
    };
    const handleChangeTime = (event) => {
        if (event.target.value !== "") {
            setTime(event.target.value);
        } else {
            return;
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/input")
            .then(function (response) {
                // success
                console.log(response.data);
                setTasks(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, [reRender]);
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:3000/input", {
                task: task,
                time: time,
                isReminder: isReminder,
            })
            .then(function (response) {
                console.log(response);
                setTask("");
                setTime("");
                setReRender(!reRender);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const handleDelete = (productId) => {
        axios
            .delete("http://localhost:3000/input/" + productId)
            .then((res) => {
                if (res.status == 200) {
                    alert("Xóa thành công");
                    setTasks(
                        tasks.filter((product) => product.id != productId)
                    );
                } else {
                    alert("Xóa thất bại");
                }
            })
            .catch((er) => null);
    };
    return (
        <div className="container">
            <div className="bang">
                <div className="input">
                    <div className="header">
                        <h1>Task Tracker</h1>
                        {!isAdd ? (
                            <span>
                                <button onClick={() => setIsAdd(!isAdd)}>
                                    Close
                                </button>
                            </span>
                        ) : (
                            <span>
                                <button
                                    style={{ backgroundColor: "greenyellow" }}
                                    onClick={() => setIsAdd(!isAdd)}
                                >
                                    Add
                                </button>
                            </span>
                        )}
                    </div>
                    {!isAdd ? (
                        <form onSubmit={handleSubmit}>
                            <div className="body">
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>
                                        <h5>Task</h5>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Add Task"
                                        value={task}
                                        onChange={handleChangeTask}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>
                                        <h5>Day & Time</h5>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Add Day & Time"
                                        value={time}
                                        onChange={handleChangeTime}
                                    />
                                </Form.Group>
                                <div className="checkbox">
                                    <h5>Set Reminder</h5>
                                    <Form.Check
                                        className="check"
                                        aria-label="option 1"
                                        checked={isReminder}
                                        onChange={() =>
                                            setIsReminder(!isReminder)
                                        }
                                    />
                                </div>
                            </div>
                            <Button
                                className="saveButton"
                                variant="primary"
                                size="lg"
                                type="submit"
                            >
                                Save Task
                            </Button>
                        </form>
                    ) : (
                        <div></div>
                    )}

                    <div className="outitem">
                        {tasks?.length > 0 ? (
                            tasks.map((task) => (
                                <React.Fragment key={randomId()}>
                                    <div className="item">
                                        <span
                                            span
                                            className={`${
                                                task.isReminder ? "xanhle" : ""
                                            }`}
                                        ></span>
                                        <div className="text">
                                            <h5>{task.task}</h5>
                                            <span>{task.time} </span>
                                        </div>
                                        <div className="delete">
                                            <button
                                                onClick={() =>
                                                    handleDelete(task.id)
                                                }
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))
                        ) : (
                            <div>
                                <h4>No Tasks To Show</h4>{" "}
                            </div>
                        )}
                    </div>
                    <div className="footer">
                        <>
                            {/* Footer */}
                            <footer className="text-center text-lg-start bg-light text-muted bg-white ">
                                <div
                                    className="text-center p-4"
                                    style={{ backgroundColor: "white" }}
                                >
                                    MiniProject API & Asynchronous © 2023 <br />
                                    <Link
                                        className="text-reset fw-bold"
                                        to="/about"
                                    >
                                        About
                                    </Link>
                            
                                </div>
                            </footer>
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
