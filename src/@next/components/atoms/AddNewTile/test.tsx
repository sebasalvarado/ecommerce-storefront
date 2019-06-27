import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddNewTile } from ".";

describe("<AddNewTile />", () => {
  // Example test
  it("exists", () => {
    const wrapper = mount(<AddNewTile type="card" />);

    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.text().toLowerCase()).toContain("add new card");
  });
});