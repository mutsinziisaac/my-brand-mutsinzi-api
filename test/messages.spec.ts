import { expect } from "chai";
import { describe, it } from "mocha";
import { Request, Response } from "express";
import sinon, { SinonStub } from "sinon";
import * as messageController from "../controllers/messageController";
import Message from "../models/message";
import { NextFunction } from "connect";

describe("Message Controller", () => {
  describe("createMessage", () => {
    it("should create a new message", async () => {
      const req = {
        body: {
          name: "Test Name",
          email: "test@example.com",
          message: "Test Message",
        },
      } as unknown as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response;

      const messageSaveStub = sinon
        .stub(Message.prototype, "save")
        .resolves({});

      await messageController.createMessage(
        req,
        res,
        sinon.stub() as NextFunction
      );

      expect(messageSaveStub.calledOnce).to.be.true;
      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledOnce).to.be.true;

      messageSaveStub.restore();
    });
  });

  describe("deleteMessage", () => {
    it("should delete an existing message", async () => {
      const req = {
        params: {
          id: "6613e3b8d70d378f4b2f2ce1",
        },
      } as unknown as Request;
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response;

      const findByIdAndDeleteStub = sinon
        .stub(Message, "findByIdAndDelete")
        .resolves({});

      await messageController.deleteMessage(
        req,
        res,
        sinon.stub() as NextFunction
      );

      expect(findByIdAndDeleteStub.calledOnceWith("6613e3b8d70d378f4b2f2ce1"))
        .to.be.true;
      expect((res.status as SinonStub).calledWith(200)).to.be.true;
      expect((res.json as SinonStub).calledOnce).to.be.true;

      findByIdAndDeleteStub.restore();
    });
  });
});
