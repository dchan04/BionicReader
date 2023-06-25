import React, { useState } from "react";
import "./Header.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as Icon from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
	const [show, setShow] = useState(false);
	return (
		<Navbar expand="lg" variant="dark" fixed="top">
			<Container>
				<Navbar.Brand>
					<h2>
						Bionic Text Converter
						<Button variant="link" onClick={() => setShow(true)}>
							<Icon.InfoCircle size={25} color="white" />
						</Button>
					</h2>
				</Navbar.Brand>
				<Modal
					show={show}
					onHide={() => setShow(false)}
					dialogClassName="modal-90w"
					aria-labelledby="example-custom-modal-styling-title"
				>
					<Modal.Header closeButton>
						<Modal.Title id="example-custom-modal-styling-title">
							What is Bionic Reading?
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>
							<b>Bio</b>nic <b>rea</b>ding <b>i</b>s <b>a</b>{" "}
							<b>ne</b>wly <b>deve</b>loped <b>rea</b>ding{" "}
							<b>met</b>hod <b>desi</b>gned <b>t</b>o <b>a</b>id{" "}
							<b>i</b>n <b>t</b>he <b>sp</b>eed <b>rea</b>ding{" "}
							<b>pro</b>cess <b>thr</b>ough <b>a</b> <b>cou</b>ple{" "}
							<b>o</b>f <b>twe</b>aks. <b>T</b>he <b>met</b>hod{" "}
							<b>w</b>as <b>rece</b>ntly <b>inve</b>nted <b>b</b>y{" "}
							<b>a</b> <b>Sw</b>iss <b>deve</b>loper <b>cal</b>led{" "}
							<b>Ren</b>ato <b>Cas</b>uut <b>a</b>nd <b>h</b>e{" "}
							<b>cla</b>ims <b>th</b>at <b>b</b>y <b>gui</b>ding{" "}
							<b>yo</b>ur <b>ey</b>es <b>thr</b>ough “<b>fixa</b>
							tion <b>poi</b>nts”, <b>yo</b>ur <b>rea</b>ding{" "}
							<b>sp</b>eed <b>a</b>nd <b>le</b>vel <b>o</b>f{" "}
							<b>compre</b>hension <b>a</b>re <b>go</b>ing{" "}
							<b>t</b>o <b>b</b>e <b>impr</b>oved.
						</p>
					</Modal.Body>
				</Modal>
			</Container>
		</Navbar>
	);
}

export default Header;
