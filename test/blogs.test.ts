import { expect } from "chai";
import { describe, it } from "mocha";
import { Request, Response } from "express";
import sinon, { SinonStub } from "sinon";
import * as blogController from "../controllers/blogController";
import Blog from "../models/blog";
import { NextFunction } from "connect";

describe("Blog Controller", () => {
  describe("blogList", () => {
    it("should return all blogs", async () => {
      const req = {} as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response;

      const blogMock = sinon.mock(Blog);
      blogMock.expects("find").returns(blogMock);
      blogMock.expects("populate").returns(blogMock);
      blogMock.expects("exec").resolves([]);

      await blogController.blogList(req, res, sinon.stub() as NextFunction);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledOnce).to.be.true;

      blogMock.restore();
    });
  });

  describe("createBlog", () => {
    it("should create a new blog", async () => {
      const req = {
        body: {
          title: "Test Title",
          description: "Test Description",
          image: "Test Image",
          comments: ["Comment 1", "Comment 2"],
        },
      } as unknown as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response;

      const blogSaveStub = sinon.stub(Blog.prototype, "save").resolves({});

      await blogController.createBlog(req, res, sinon.stub() as NextFunction);

      expect(blogSaveStub.calledOnce).to.be.true;
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledOnce).to.be.true;

      blogSaveStub.restore();
    });
  });
});
