/*
The MIT License (MIT)

Copyright (c) 2014, Groupon, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
package com.groupon.jenkins.dynamic.buildconfiguration;

import java.util.ArrayList;
import java.util.List;

import com.google.common.base.Joiner;

public class DockerCommandBuilder {
	private final String dockerCommand;

	private final Joiner spaceJoiner = Joiner.on(" ");
	private String args;
	private final List<String> flags = new ArrayList<String>();

	public DockerCommandBuilder(String command) {
		dockerCommand = "docker " + command;
	}

	public static DockerCommandBuilder dockerCommand(String command) {
		return new DockerCommandBuilder(command);
	}

	public DockerCommandBuilder args(String... args) {
		this.args = spaceJoiner.join(args);
		return this;
	}

	public String get() {
		return spaceJoiner.join(dockerCommand, spaceJoiner.join(flags), args);
	}

	public DockerCommandBuilder flag(String flag) {
		flags.add("-" + flag);
		return this;
	}

	public DockerCommandBuilder flag(String flag, String value) {
		flags.add(spaceJoiner.join("-" + flag, value));
		return this;
	}
}
